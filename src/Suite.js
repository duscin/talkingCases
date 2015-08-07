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

