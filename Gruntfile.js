
(function()
{
    'use strict';

    var main_css_files = [
        'static/css/style.css',
        'static/css/header.css',
        'static/css/header.search.css',
        'static/css/general.css',
        'static/css/home.css'
    ];
    var secondary_css_files = [
        'static/css/gallery.ho.css',
        'static/css/footer.css',
        'static/css/listado_articulos.css',
        'static/css/listado_productos.css',
        'static/css/simple-sidebar.css'
    ];
    var all_js_files = [
        'static/js/cart.config.js',
        'static/js/filter.js',
        'static/js/spec_filter.js'
    ];

    module.exports = function(grunt)  //jshint ignore: line
    {
        require('load-grunt-tasks')(grunt);  //jshint ignore: line

        grunt.initConfig(
        {
            concat:
            {
                css_basic:
                {
                    src: main_css_files,
                    dest: 'static/css/main.min.css',
                },
                css_extras:
                {
                    src: secondary_css_files,
                    dest: 'static/css/extras.min.css'
                },
                js:
                {
                    src: all_js_files,
                    dest: 'static/js/main.min.js'
                }
            },
            watch:
            {
                css:
                {
                    files: main_css_files.concat(secondary_css_files),
                    tasks: ['concat:css_basic', 'concat:css_extras'],
                    options:
                    {
                        spawn: false
                    }
                },
                js:
                {
                    files: all_js_files,
                    tasks: ['concat:js'],
                    options:
                    {
                        spawn: false
                    }
                }
            },
            cssmin:
            {
                options:
                {
                    mergeIntoShorthands: false,
                    roundingPrecision: -1
                },
                target:
                {
                    files:
                    {
                        'static/css/main.min.css': main_css_files,
                        'static/css/extras.min.css': secondary_css_files
                    }
                }
            },
            uglify:
            {
                my_target:
                {
                    files: {
                        'static/js/main.min.js': all_js_files
                    }
                }
            }

        });

        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');

        grunt.registerTask('build', ['cssmin', 'uglify']);
        grunt.registerTask('develop', ['watch']);
    };
})();
