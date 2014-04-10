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
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'node-inspector'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug-brk'],
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    }
                }
            }
        },
        'node-inspector': {
            dev: {}
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-node-inspector');

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('styles', ['less']);
    grunt.registerTask('dev', ['concurrent']);
};
