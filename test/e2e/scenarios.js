'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('chatterBox', function() {

    browser.get('/');

    it('should load the home page with all its elements', function() {
        var header  = by.id('site-header');
        var section = by.id('content');
        var footer  = by.id('text-input');
    });

    it('should display a chat message within the content frame', function() {
        element(by.model('msg')).sendKeys('Hello world!');
        element(by.model('msg')).sendKeys(protractor.Key.ENTER);
        var chatMessage = element(by.css('li div.message'));
        expect(chatMessage.getText()).toEqual('Hello world!');
    });
});
