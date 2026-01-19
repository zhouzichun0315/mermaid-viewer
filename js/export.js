// 导出功能模块

/**
 * 导出为 SVG 文件
 */
function exportSvg() {
    const svgElement = document.querySelector('#mermaidOutput svg');
    if (!svgElement) {
        alert('请先生成流程图');
        return;
    }
    
    // 克隆 SVG 并添加样式
    const clonedSvg = svgElement.cloneNode(true);
    
    // 设置背景色
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    clonedSvg.style.backgroundColor = isDark ? '#252526' : '#ffffff';
    
    // 序列化 SVG
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(clonedSvg);
    
    // 添加 XML 声明
    svgString = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgString;
    
    // 创建下载
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    downloadBlob(blob, 'mermaid-diagram.svg');
}

/**
 * 导出为 PNG 文件 (使用 html2canvas)
 */
function exportPng() {
    const mermaidOutput = document.getElementById('mermaidOutput');
    const svgElement = mermaidOutput.querySelector('svg');
    if (!svgElement) {
        alert('请先生成流程图');
        return;
    }
    
    // 获取背景色
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const bgColor = isDark ? '#252526' : '#ffffff';
    
    // 使用 html2canvas 截取
    html2canvas(mermaidOutput, {
        backgroundColor: bgColor,
        scale: 2,  // 2x 分辨率
        useCORS: true,
        allowTaint: true,
        logging: false
    }).then(function(canvas) {
        canvas.toBlob(function(blob) {
            downloadBlob(blob, 'mermaid-diagram.png');
        }, 'image/png');
    }).catch(function(error) {
        console.error('Export PNG error:', error);
        alert('导出 PNG 失败，请尝试导出 SVG');
    });
}

/**
 * 下载 Blob 文件
 */
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
