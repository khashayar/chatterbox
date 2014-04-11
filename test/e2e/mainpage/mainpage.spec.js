'use strict';

var config = require('../../../config/auth/credentials');

var ChatterBoxMainpage = function() {
    this.header             = element(by.css('#site-header h1'));
    this.googleAuth         = element(by.css('.googleAuth'));
    this.googleLogin        = config.google.login;
    this.googlePassword     = config.google.password;
    this.facebookAuth       = element(by.css('.facebookAuth'));
    this.facebookLogin      = config.facebook.login;
    this.facebookPassword   = config.facebook.password;

    ChatterBoxMainpage.prototype.navigateTo = function() {
        browser.get('/');
    };

    ChatterBoxMainpage.prototype.googlePress = function() {
        this.googleAuth.click();
    };

    ChatterBoxMainpage.prototype.facebookPress = function() {
        this.facebookAuth.click();
    };

    ChatterBoxMainpage.prototype.sendMsg = function(message) {
        this.msgInput.sendKeys(message);
    };

    return this;
};

module.exports = new ChatterBoxMainpage();
