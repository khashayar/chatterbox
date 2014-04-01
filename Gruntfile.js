'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: './config/test/karma.conf.js'
            }
        },
        less: {
            dev: {
                files: {
                    'public/styles/styles.css': 'public/styles/styles.less'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('styles', ['less']);
};
