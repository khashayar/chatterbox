'use strict';

describe('chatterBox', function() {
    var chatterBoxMainpage = require('./mainpage/mainpage.spec.js');

    beforeEach(function() {
        chatterBoxMainpage.navigateTo();
    });

    describe('chatterBox connect functionality', function() {
        it('should load the home page with all its elements', function() {
            expect(chatterBoxMainpage.header.getText()).toEqual('chatterBox');
        });

        it('should login via google', function() {
            chatterBoxMainpage.googlePress();
            var emailInput = browser.driver.findElement(by.id('Email'));
            emailInput.sendKeys(chatterBoxMainpage.googleLogin);

            var passwordInput = browser.driver.findElement(by.id('Passwd'));
            passwordInput.sendKeys(chatterBoxMainpage.googlePassword);

            var signInButton = browser.driver.findElement(by.id('signIn'));
            signInButton.click();

            browser.driver.sleep(1500);

            var submitApproveAccess = browser.driver.findElement(by.id('submit_approve_access'));
            submitApproveAccess.click();

            browser.driver.sleep(2300);
            expect(browser.isElementPresent(by.css('#text-input'))).toBe(true);

        });

        it('should login via facebook', function() {
            chatterBoxMainpage.facebookPress();
            var emailInput = browser.driver.findElement(by.id('email'));
            emailInput.sendKeys(chatterBoxMainpage.facebookLogin);

            var passwordInput = browser.driver.findElement(by.id('pass'));
            passwordInput.sendKeys(chatterBoxMainpage.facebookPassword);

            var signInButton = browser.driver.findElement(by.id('loginbutton'));
            signInButton.click();

            browser.driver.sleep(1500);

            var submitApproveAccess = browser.driver.findElement(by.name('__CONFIRM__'));
            submitApproveAccess.click();

            browser.driver.sleep(1300);
            expect(browser.isElementPresent(by.css('#text-input'))).toBe(true);
        });
    });
});
