// 主应用逻辑

// DOM 元素
const codeEditor = document.getElementById('codeEditor');
const mermaidOutput = document.getElementById('mermaidOutput');
const errorMessage = document.getElementById('errorMessage');
const templateSelect = document.getElementById('templateSelect');
const themeToggle = document.getElementById('themeToggle');
const exportPngBtn = document.getElementById('exportPng');
const exportSvgBtn = document.getElementById('exportSvg');

// 渲染计数器，用于生成唯一 ID
let renderCounter = 0;

// 防抖定时器
let debounceTimer = null;

/**
 * 初始化 Mermaid
 */
function initMermaid() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true
        }
    });
}

/**
 * 渲染 Mermaid 图表
 */
async function renderMermaid() {
    const code = codeEditor.value.trim();
    
    if (!code) {
        mermaidOutput.innerHTML = '<p style="color: var(--text-secondary);">请在左侧输入 Mermaid 代码</p>';
        errorMessage.style.display = 'none';
        return;
    }
    
    try {
        // 验证语法
        await mermaid.parse(code);
        
        // 生成唯一 ID
        const id = `mermaid-${++renderCounter}`;
        
        // 渲染图表
        const { svg } = await mermaid.render(id, code);
        mermaidOutput.innerHTML = svg;
        errorMessage.style.display = 'none';
    } catch (error) {
        // 显示错误信息
        errorMessage.textContent = error.message || '语法错误';
        errorMessage.style.display = 'block';
    }
}

/**
 * 防抖渲染
 */
function debouncedRender() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(renderMermaid, 300);
}

/**
 * 切换主题
 */
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 更新图标
    const themeIcon = themeToggle.querySelector('.theme-icon');
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    // 重新初始化 Mermaid 并渲染
    initMermaid();
    renderMermaid();
}

/**
 * 加载保存的主题
 */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        const themeIcon = themeToggle.querySelector('.theme-icon');
        themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

/**
 * 处理模板选择
 */
function handleTemplateChange(e) {
    const index = parseInt(e.target.value, 10);
    if (!isNaN(index)) {
        const code = getTemplateCode(index);
        if (code) {
            codeEditor.value = code;
            renderMermaid();
        }
    }
    // 重置选择框
    e.target.value = '';
}

/**
 * 初始化应用
 */
function init() {
    // 加载保存的主题
    loadSavedTheme();
    
    // 初始化 Mermaid
    initMermaid();
    
    // 初始化模板
    initTemplates();
    
    // 绑定事件
    codeEditor.addEventListener('input', debouncedRender);
    templateSelect.addEventListener('change', handleTemplateChange);
    themeToggle.addEventListener('click', toggleTheme);
    exportPngBtn.addEventListener('click', exportPng);
    exportSvgBtn.addEventListener('click', exportSvg);
    
    // 初始渲染
    renderMermaid();
}

// 启动应用
document.addEventListener('DOMContentLoaded', init);
