'use strict';

var ChatterBoxMainpage = function() {
    this.msgInput = element(by.model('msg'));
    this.header = element(by.css('#site-header h1'));
    this.chatMessage = element(by.css('li div.message'));

    ChatterBoxMainpage.prototype.navigateTo = function() {
        browser.get('/');
    };

    ChatterBoxMainpage.prototype.sendMsg = function(message) {
        this.msgInput.sendKeys(message);
    };

    return this;
};

module.exports = new ChatterBoxMainpage();
