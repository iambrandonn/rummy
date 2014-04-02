/* global module */

module.exports = function(grunt) {
  grunt.initConfig({
    cssmin: {
      combine: {
        files: {
          'build/app.min.css': ['build/app.css']
        }
      }
    },
    myth: {
      dist: {
        files: {
          'build/app.css': 'styles/app.css'
        }
      }
    },
    simplemocha: {
      all: {
        src: ['test/**/*.js']
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        compress: false,
        mangle: false,
        beautify: true
        // compress: true,
        // mangle: true,
        // beautify: false
      },
      dist: {
        files: {
          'build/app.js': [
            'scripts/fastclick.js',
            'scripts/modernizr.js',
            'scripts/resizeend.js',
            'scripts/states.js',
            'scripts/card.js',
            'scripts/deck.js',
            'scripts/player.js',
            'scripts/hand.js',
            'scripts/game.js',
            'scripts/app.js',
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: ['scripts/**/*.js'],
        tasks: ['default']
      },
      css: {
        files: ['styles/**/*.css'],
        tasks: ['myth', 'cssmin']
      }
    },
    copy: {
      fonts: {
        src: 'fonts/*',
        dest: 'build/'
      }
    },
    clean: ['build']
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-myth');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['simplemocha', 'clean', 'copy', 'uglify', 'myth', 'cssmin']);
};