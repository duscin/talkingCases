(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Test = require('./Test');

/**
 * expose Suite
 */
exports=module.exports=Suite;

//测试suite类定义
function Suite(title) {
    this.title = title;
    this._tests = [];    
}

Suite.prototype={

    addTest:function(test) {
        this._tests.push(test);
    },

    getTests:function() {
        return this._tests;
    }
};


},{"./Test":2}],2:[function(require,module,exports){
/**
 * expose Suite
 */
exports=module.exports=Test;

function Test(title, fn) {
    this.title = title;
    this.fn = fn;
}
},{}],3:[function(require,module,exports){
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
},{"./Suite":1,"./Test":2}],4:[function(require,module,exports){
window.talkingCases = require('./talkingCases')(window);
},{"./talkingCases":5}],5:[function(require,module,exports){

var TestRunner = require('./TestRunner');
var Suite = require('./Suite');
var Test = require('./Test');

exports = module.exports = function(context,options) {    
    var runner = new TestRunner();

    /**
     * 建立一个测试场景, 
     *
     * @param  {String}   title 场景描述
     * @param  {Function} fn    初始化函数     
     */
    context.describe=function(title, fn) {
        var suite = new Suite(title);
        runner.addSuite(suite);
        fn.call(suite);
    };

    /**
     * 注册一个测试开始前的钩子, 在describe内部调用
     * @param  {String}   title 钩子标题
     * @param  {Function} fn    执行函数
     */
    context.before=function(title,fn) {
        runner.addBefore({
            'title':title,
            'fn':fn,
            'context':this
        });
    };

     /**
     * 注册一个测试结束后的钩子, 在describe内部调用
     * @param  {String}   title 钩子标题
     * @param  {Function} fn    执行函数
     */
    context.after=function(title,fn) {
        runner.addAfter({
            'title':title,
            'fn':fn,
            'context':this
        });
    };

    /**
     * 建立一个测试用例
     * @param  {String}   title 测试标题
     * @param  {Function} fn    测试函数     
     */
    context.it=function(title, fn) {
        //this引用的父suite
        var suite = runner.getLastSuite();
        var test = new Test(title,fn);
        suite.addTest(test);
    };

    context.run = function() {
        runner.buildDom();
    };

    context.verifyResult = function(test) {
        if (confirm('测试运行是否成功')) {
            test.result=true;
        } else {
            test.result=false;
        }
    };
};
    
},{"./Suite":1,"./Test":2,"./TestRunner":3}]},{},[4]);
