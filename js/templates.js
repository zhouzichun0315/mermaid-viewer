// 示例模板数据
const templates = [
    {
        name: '流程图 - 基础',
        code: `graph TD
    A[开始] --> B{是否有条件?}
    B -->|是| C[执行操作A]
    B -->|否| D[执行操作B]
    C --> E[结束]
    D --> E`
    },
    {
        name: '流程图 - 左右布局',
        code: `graph LR
    A[输入数据] --> B[数据处理]
    B --> C{验证通过?}
    C -->|是| D[保存数据]
    C -->|否| E[返回错误]
    D --> F[返回成功]
    E --> G[结束]
    F --> G`
    },
    {
        name: '时序图',
        code: `sequenceDiagram
    participant U as 用户
    participant C as 客户端
    participant S as 服务器
    participant D as 数据库
    
    U->>C: 点击登录
    C->>S: 发送登录请求
    S->>D: 查询用户信息
    D-->>S: 返回用户数据
    S-->>C: 返回登录结果
    C-->>U: 显示登录状态`
    },
    {
        name: '类图',
        code: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat`
    },
    {
        name: '状态图',
        code: `stateDiagram-v2
    [*] --> 待处理
    待处理 --> 处理中: 开始处理
    处理中 --> 已完成: 处理成功
    处理中 --> 失败: 处理出错
    失败 --> 待处理: 重试
    已完成 --> [*]`
    },
    {
        name: '饼图',
        code: `pie title 项目时间分配
    "开发" : 45
    "测试" : 25
    "设计" : 15
    "会议" : 10
    "其他" : 5`
    },
    {
        name: '甘特图',
        code: `gantt
    title 项目开发计划
    dateFormat  YYYY-MM-DD
    section 设计阶段
    需求分析    :a1, 2024-01-01, 7d
    UI设计      :a2, after a1, 5d
    section 开发阶段
    前端开发    :b1, after a2, 14d
    后端开发    :b2, after a2, 14d
    section 测试阶段
    测试        :c1, after b1, 7d`
    },
    {
        name: 'Git 分支图',
        code: `gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    branch feature
    checkout feature
    commit
    checkout main
    merge feature`
    }
];

// 初始化模板下拉框
function initTemplates() {
    const select = document.getElementById('templateSelect');
    templates.forEach((template, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = template.name;
        select.appendChild(option);
    });
}

// 获取模板代码
function getTemplateCode(index) {
    if (index >= 0 && index < templates.length) {
        return templates[index].code;
    }
    return null;
}
