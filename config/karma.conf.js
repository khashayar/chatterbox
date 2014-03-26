module.exports = function(config) {
    config.set({
        basePath : '../',

        files : [
            'test/lib/angular/angular.js',
            'test/lib/angular/angular-*.js',
            'public/scripts/**/*.js',
            'test/unit/**/*.js'
        ],

        exclude : [
            'app/lib/angular/angular-loader.js',
            'app/lib/angular/*.min.js',
            'app/lib/angular/angular-scenario.js'
        ],

        autoWatch : true,

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
