开发环境建立步骤:

1. 安装node.js
2. npm install -g gulp
3. npm install
5. 运行 gulp
6. 访问 http://localhost:20000/

gulp自动用browerify编译源代码, 压缩后发布到dist目录中,dist目录初始时是空的,需要初始化后才会生成.

修改src目录中的talkingCases源代码后, gulp会自动编译发布.

目录结构:

src: talkingCases的源代码
index.html:测试运行页面
app/cases.js:测试用例逻辑页面