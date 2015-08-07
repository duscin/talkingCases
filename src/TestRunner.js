var Suite = require('./Suite');
var Test = require('./Test');
/**
 * expose Suite
 */
exports=module.exports=TestRunner;

function createEl(tag) {
    return document.createElement(tag);
}

function getEl(id) {
    return document.getElementById(id);
}

//测试suite类定义
function TestRunner(context) {
    this._suites = [];
    this._befores = [];
    this._afters = [];
    this._context = context;
}

TestRunner.prototype={
    addBefore:function(_before) {
        this._befores.push(_before);
    },

    runBefores:function() {
        for (var i = 0; i < this._befores.length; i++) {
            this._befores[i].fn.call(this._context);
        }
    },

    addAfter:function(_after) {
        this._after.push(_after);
    },

    runAfters:function() {
        for (var i = 0; i < this._afters.length; i++) {
            this._afters[i].fn.call(this._context);
        }
    },

    addSuite:function(suite) {
        this._suites.push(suite);
    },

    getLastSuite:function() {
        return this._suites[this._suites.length-1];
    },

    clearContainer:function() {
        var container  = getEl('container');
        container.innerHTML = '';
        delete this._currentSuite;
        delete this._currentSuiteItem;
        delete this._currentTest;
        delete this._currentTestItem;
    },

    clearStage:function() {
        var self = this;
        this.clearContainer();

        var cases  = getEl('cases');
        cases.innerHTML = '';

        var operations = getEl('operations');
        operations.innerHTML = '';

        var btnPass = createEl('a');
        btnPass.style.cssText = "margin:10px;";
        btnPass.href='javascript:;';
        btnPass.innerText='通过';
        btnPass.onclick=function() {
            if (!self._currentTest) {
                alert('请选择要做的单元测试');
                return;
            }
            self._currentTest.result = true;
            self._currentTestItem.style.backgroundColor = '#0f0';
        };

        var btnFail = createEl('a');
        btnFail.style.cssText = "margin:10px;";
        btnFail.href='javascript:;';
        btnFail.innerText='失败';
        btnFail.onclick=function() {
            if (!self._currentTest) {
                alert('请选择要做的单元测试');
                return;
            }
            self._currentTest.result = false;
            self._currentTestItem.style.backgroundColor = '#f00';
            self._currentSuiteItem.style.backgroundColor = '#f00';
        };

        operations.appendChild(btnPass);
        operations.appendChild(btnFail);
        
    },

    buildDom:function() {
        
        //清空容器
        var menu = getEl('menu');
        menu.innerHTML = "";

        

        this.clearStage();

        this.buildDescribeMenu();
    },

    /**
     * 构建测试菜单     
     */
    buildDescribeMenu:function() {
        
        for (var i = 0; i < this._suites.length; i++) {
            var suite = this._suites[i];
            this.buildMenuItem(suite);
        }

    },

    buildMenuItem:function(suite) {
        var self = this;
        var menu = getEl('menu');
        var suiteItem = createEl('div');
        suiteItem.style.cssText = "width:100%;background-color:#ff0;cursor:pointer;text-align:center;";
        suiteItem.innerHTML = suite.title;
        suiteItem.onclick=(function(_suite) {
            return function() {
                self.clearStage();                
                self.runBefores();
                self._currentSuite = suite;
                self._currentSuiteItem = suiteItem;
                self.buildStage(_suite);
            };
        })(suite);
        menu.appendChild(suiteItem);
    },

    buildStage:function(suite) {
        var tests = suite.getTests();
        for (var i = 0; i < tests.length; i++) {
            var test = tests[i];
            this.buildTestItem(test);
        }

    },

    buildTestItem:function(test) {        
        var self = this;
        var fn = test.fn;
        var caseDiv = getEl('cases');
        var caseItem = createEl('div');        
        caseItem.style.cssText = "width:10%;background-color:#ff0;cursor:pointer;text-align:center;";
        caseItem.innerHTML = test.title;
        //点击后运行测试
        caseItem.onclick=(function(__context) {           
            return function() {
                getEl('title').innerHTML = '当前测试:' + test.title;
                self._currentTest = test;
                self._currentTestItem = caseItem;
                
                fn.call(__context);
                
            };
        })(this._context);
        caseDiv.appendChild(caseItem);
    }
};