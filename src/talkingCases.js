
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
    