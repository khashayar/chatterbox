'use strict';

exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        '../../test/e2e/*.js'
    ],

    chromeOnly: false,

    multiCapabilities: [{
    'browserName': 'chrome'
    }, {
    'browserName': 'firefox'
    }],

    baseUrl: 'http://localhost:3000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },

    onCleanUp: function() {
    }
};
