
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
        'static/css/checkout.css',
        'static/css/simple-sidebar.css',
        'static/css/ligthbox-d.css'
    ];

    module.exports = function(grunt)  //jshint ignore: line
    {
        require('load-grunt-tasks')(grunt);  //jshint ignore: line

        grunt.initConfig(
        {
            concat:
            {
                basic:
                {
                    src: main_css_files,
                    dest: 'static/css/main.min.css',
                },
                extras:
                {
                    src: secondary_css_files,
                    dest: 'static/css/extras.min.css'
                }
            },
            watch:
            {
                css:
                {
                    files: main_css_files.concat(secondary_css_files),
                    tasks: ['concat'],
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
            }
        });

        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-concat');

        grunt.registerTask('build', ['cssmin']);
        grunt.registerTask('develop', ['watch']);
    };
})();
