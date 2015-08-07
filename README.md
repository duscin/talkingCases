开发环境建立步骤:
-----------------

1. 安装node.js
2. npm install -g gulp
3. npm install
5. 运行 gulp
6. 访问 http://localhost:20000/

gulp流程:
---------

1.browerify编译源代码

2.压缩后发布到dist目录中

3.监听src目录, 有修改则自动编译发布.


目录结构:
-----------------

src: talkingCases的源代码

dist: talkingCases的发布目录

index.html:测试运行页面

app/cases.js:测试用例逻辑页面