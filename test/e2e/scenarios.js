'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('chatterBox', function() {
    var chatterBoxMainpage = require('./mainpage/mainpage.spec.js');

    chatterBoxMainpage.navigateTo();

    it('should load the home page with all its elements', function() {
        expect(chatterBoxMainpage.header.getText()).toEqual('chatterBox');
    });

    it('should display a chat message within the content frame', function() {
        chatterBoxMainpage.sendMsg('Hello world!\n');
        expect(chatterBoxMainpage.chatMessage.getText()).toEqual('Hello world!');
    });
});
