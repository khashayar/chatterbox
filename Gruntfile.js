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
                    'public/styles/styles.css': 'public/styles/less/*.less'
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
        protractor: {
            dev: {
                options: {
                    configFile: 'config/test/protractor-conf.js', // Default config file
                    keepAlive: false, // If false, the grunt process stops when the test fails.
                    noColor: false, // If true, protractor will not use colors in its output.
                    args: {
                    // Arguments passed to the command
                    }
                },
                your_target: {
                    options: {
                        configFile: 'config/test/karma-e2e.conf.js', // Target-specific config file
                        args: {} // Target-specific arguments
                    }
                },
            },
        },
        express: {
            dev: {
                options: {
                    script: 'server.js',
                    node_env: 'development'
                }
            },
            prod: {
                options: {
                    script: 'server.js',
                    node_env: 'production'
                }
            },
            test: {
                options: {
                    script: 'server.js',
                    node_env: 'test'
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
        },
        watch: {
            styles: {
                // Which files to watch (all .less files recursively in the less directory)
                files: ['public/styles/less/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-node-inspector');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('unit-test', ['karma']);
    grunt.registerTask('styles', ['less']);
    grunt.registerTask('dev', ['concurrent']);
    grunt.registerTask('e2e-test', ['express:dev', 'protractor']);
    grunt.registerTask('tests', ['karma', 'express:dev', 'protractor']);
};
