# SDUOJ 新版前端

之前的前端，管理端与用户端是分离的，使用了 Vue 作为开发的框架，
由于使用的 UI 框架有一些 Bug 长时间无人维护，所以决定使用 React 与 Ant Design
重新进行编写。

> 项目正在施工中，预计完成时间为 2022 年 2 月

## 当前进度

- [ ] 整体优化
  - [ ] package 打包优化，减小 JS 体积
- [x] C 端
  - [ ] 主页
    - [x] 公告
    - [ ] 搜索
  - [ ] 用户
    - [x] 登录
    - [ ] 注册  (1.27)
    - [ ] 找回密码  (1.27)
    - [ ] 个人信息  (1.27)
  - [ ] 题目
    - [ ] 题目列表  (1.27)
    - [ ] 题目详情  (1.27)
  - [ ] 提交
    - [x] 提交列表
      - [x] 基础功能
      - [x] 筛选
    - [ ] 提交页面
      - [ ] 基础功能
        - [x] 代码
        - [x] 运行时
        - [ ] 总结
          - [ ] 提交信息
            - [ ] Submission ID，提交时间，评测时间
            - [ ] 用户名，评测结果，评测模板
          - [x] 统计
          - [x] 评测结果
      - [ ] 重测
      - [ ] 取消成绩
  - [ ] 比赛
    - [ ] 比赛列表
      - [ ] 基本功能  (1.28)
      - [ ] 按组筛选  (1.28)
      - [ ] 按比赛类型筛选  (1.28)
    - [ ] 比赛详情
      - [ ] 基本信息  (1.28)
      - [ ] 总览  (1.28)
      - [ ] 问题详情  (1.28)
      - [ ] 提交  (1.28)
      - [ ] 排行榜  (1.29-1.30)
        - [ ] 基本功能  
          - [ ] 榜单
          - [ ] 练习参赛
          - [ ] 收藏
        - [ ] 导出
        - [ ] 是否显示练习提交
      - [ ] 问答
  - [ ] 用户组  (1.31)
    - [ ] 卡片表
    - [ ] 详情
      - [ ] 通告
      - [ ] 比赛列表
      - [ ] 成员列表
      - [ ] 退出功能
- [ ] M 端 (Manage)
  - [ ] 用户
    - [x] 列表
    - [ ] 新建/编辑  (1.27)
    - [x] 批量删除
    - [x] 批量导出
    - [ ] 批量导入  (1.27)
    - [ ] 单个删除  (1.27)
  - [ ] 题目
    - [ ] 列表  (1.28)
    - [ ] 新建/编辑/克隆  (1.28)
    - [ ] 批量编辑  (1.28)
  - [ ] 比赛
    - [ ] 列表  (1.29)
    - [ ] 新建/编辑/克隆  (1.29)
  - [ ] 评测模板
    - [ ] 列表
    - [ ] 新建/编辑/克隆
  - [ ] 用户组  (1.31)
    - [ ] 列表
    - [ ] 新建/编辑
    - [ ] 成员管理
  - [x] 考试
    - [x] 查看（基于表格）
    - [x] 添加
    - [x] 修改
    - [x] 导出考试结果
    - [x] 查看编程题提交记录
      - [x] 重测题目
  - [x] 客观题
    - [x] 查看
    - [x] 单个添加
    - [x] 批量添加
    - [x] 修改
  - [x] 公告
    - [x] 列表
    - [x] 新建/编辑
- [x] E 端 (Exam)
  - [x] 考试列表（基于表格）
  - [x] 考前等待页面
  - [x] 考试页面
  - [x] 考试完成页面
