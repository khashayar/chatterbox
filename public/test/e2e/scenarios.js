'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('chatterBox', function() {

    browser.get('/');

    it('should show the express welcome header', function() {
        var title = element(by.binding('title'));
        expect(title.getText()).toEqual('Welcome to chatterBox');
    });
});
