'use strict';

module.exports = function(config) {
    config.set({
        basePath : '../../',

        files : [
            'public/components/angular-socket-io/mock/socket-io.js',
            'public/components/angular/angular.js',
            'public/components/angular-mocks/angular-mocks.js',
            'public/components/angular-route/angular-route.js',
            'public/components/angular-socket-io/socket.js',
            'public/scripts/**/*.js',
            'test/unit/**/*.js'
        ],

        exclude : [
            'app/lib/angular/angular-loader.js',
            'app/lib/angular/*.min.js',
            'app/lib/angular/angular-scenario.js'
        ],

        autoWatch : true,
        singleRun: true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-script-launcher',
            'karma-jasmine'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
