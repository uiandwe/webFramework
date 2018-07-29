module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        clean: {
            options: {
                force : true
            },
            test: ['doc']
        },

        jsdoc: {
            client: {
                src: ['./client/pages/main/controllers/*.js', './client/pages/main/services/*.js'],
                options: {
                    destination: 'doc/client',
                    readme: './README.md'
                }
            },
            server: {
                src: ['./server/model/*.js', './server/routes/*.js', './server/utils/*.js'],
                    options: {
                    destination: 'doc/server',
                        readme: './README.md'
                }
            }
        }
    });

    // Load local tasks.
    // grunt.loadTasks('tasks');


    //testing tasks
    grunt.registerTask('test-basic',     'Test basic jsdoc', ['jsdoc:basic', 'nodeunit:basic']);
    grunt.registerTask('test-alternate', 'Test jsdoc with alternate options', ['jsdoc:alternate', 'nodeunit:alternate']);
    grunt.registerTask('test-docstrap',  'Test jsdoc with a template', ['jsdoc:docstrap', 'nodeunit:docstrap']);
    grunt.registerTask('test-spacepack', 'Test jsdoc with a package and spaces in the paths', ['jsdoc:spacepack', 'nodeunit:spacepack']);
    grunt.registerTask('test-nosrc', 'Test jsdoc without src and dest, only a config', ['jsdoc:nosrc', 'nodeunit:nosrc']);
    grunt.registerTask('test',           'Full test suite', ['clean:test', 'nodeunit:unit', 'test-basic', 'test-alternate', 'test-docstrap', 'test-spacepack', 'test-nosrc']);

    grunt.registerTask('default', 'Default task will lint and test', ['eslint:all', 'test']);
};
