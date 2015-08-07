/**
 * expose Suite
 */
exports=module.exports=Test;

function Test(title, fn) {
    this.title = title;
    this.fn = fn;
}