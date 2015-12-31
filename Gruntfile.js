'use strict';

module.exports = function (grunt) {

  var path = require('path');

  require('time-grunt')(grunt);

  var config = {
    src                 : 'src',
    dist                : 'dist',
    assets              : 'assets',
    server              : 'server',
    build_notifications : true
  };

  grunt.initConfig({
    config: config,
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      hapi: {
        files: [
          '<%= config.server %>/**/*.js'
        ],
        tasks: [
          'jshint',
          'hapi'
        ]
      },
      ts: {
        files: ['<%= config.src %>/**/*.ts'],
        tasks: [
          'tslint',
          'ts',
          'clean:baseDirFile'
        ]
      },
      styles: {
        files: ['<%= config.src %>/**/*.scss'],
        tasks: [
          'sass',
          'postcss',
          'cssmin'
        ]
      },
      assets: {
        files: [
          '<%= config.src %>/<%= config.assets %>/**/*.*', 
          '!<%= config.src %>/<%= config.assets %>/**/*.scss'
        ],
        tasks: [
          'copy:assets'
        ]
      },
      html: {
        files: [
          '<%= config.src %>/**/*.html'
        ],
        tasks: [
          'copy:html',
          'htmlmin',
          'inject_livereload'
        ]
      }
    },
    // HapiJS
    hapi: {
      server: {
        options: {
          server: path.resolve('<%= config.server %>/dev.js'),
          bases: {
            '/dist': path.resolve('./<%= config.dist %>')
          }
        }
      }
    },
    // TypeScript tasks
    tslint: {
      options: {
        configuration: 'tslint.json'
      },
      files: {
        src: ['<%= config.src %>/**/*.ts']
      }
    },
    ts: {
      all: {
        tsconfig: true,
        files: [{
          src: ['<%= config.src %>/**/*.ts'],
          dest: '<%= config.dist %>'
        }]
      }
    },
    // SASS & CSS tasks
    sass: {
      all: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/<%= config.assets %>/css',
          src: '**/*.scss',
          dest: '<%= config.dist %>/<%= config.assets %>/css',
          ext: '.css'
        }]
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/<%= config.assets %>/css',
          src: '**/*.css',
          dest: '<%= config.dist %>/<%= config.assets %>/css'
        }]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/assets/css',
          src: ['**/*.css'],
          dest: '<%= config.dist %>/assets/css',
          ext: '.css'
        }]
      }
    },
    // HTML
    prettify: {
      options: {
        indent: 2,
        condense: true,
        indent_char: ' ',
        indent_scripts: 'normal'
      },
      files: {
        expand: true,
        cwd: '<%= config.src %>',
        ext: '.html',
        src: ['**/*.html'],
        dest: '<%= config.src %>'
      },
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: 'index.html',
          dest: '<%= config.dist %>',
          ext: '.html'
        }]
      }
    },
    // Copy assets
    copy: {
      html: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>', 
          src: ['**/*.html'], 
          dest: '<%= config.dist %>'
        }]
      },
      assets: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/<%= config.assets %>', 
          src: ['**/*.*', '!**/*.scss'], 
          dest: '<%= config.dist %>/<%= config.assets %>'
        }]
      },
    },
    // Clean
    clean: {
      dist: {
        expand: true,
        cwd: '<%= config.dist %>',
        src: ['**/*.*']
      },
      baseDirFile: {
        expand: true,
        src: ['**/.baseDir.ts']
      }
    },
    // Angular 2 Bundle with Deps
    concat: {
      vendor: {
        files: {
          '<%= config.dist %>/vendor/bundle.js': [
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            'node_modules/angular2/bundles/router.dev.js',
            'node_modules/angular2/bundles/http.dev.js'
          ]
        }
      }
    },
    // Minify Angular 2 Bundle
    uglify: {
      bundle: {
        options: {
          sourceMap: true
        },
        files: {
          '<%= config.dist %>/vendor/bundle.js': '<%= config.dist %>/vendor/bundle.js'
        }
      }
    },
    // Server tasks
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= config.server %>/**/*.js'
      ]
    },
    notify_hooks: {
      options: {
        tslint_enabled: true
      }
    },
    inject_livereload: {
      files: ['<%= config.dist %>/index.html']
    },
    open: {
      dev: {
        path: 'http://0.0.0.0:3000'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-hapi');
  grunt.loadNpmTasks('grunt-open');

  grunt.loadTasks('tasks');

  grunt.task.run('notify_hooks');

  grunt.registerTask('server', [
    'clean:dist',
    'concat:vendor',
    'uglify',
    'tslint',
    'ts',
    'sass',
    'postcss',
    'cssmin',
    'copy:html',
    'htmlmin',
    'inject_livereload',
    'copy:assets',
    'clean:baseDirFile',
    'jshint',
    'hapi',
    'open',
    'watch'
  ]);

  grunt.registerTask('html', ['prettify']);

  grunt.registerTask('build', [
    'clean:dist',
    'concat:vendor',
    'uglify',
    'tslint',
    'ts',
    'sass',
    'postcss',
    'cssmin',
    'copy:html',
    'htmlmin',
    'jshint',
    'copy:assets',
    'clean:baseDirFile'
  ]);

  grunt.registerTask('default', ['server']);

};