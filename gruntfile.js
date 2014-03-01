module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'build/browserify.js': ['scripts/app.js'],
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
        sourceMap: true
      },
      dist: {
        files: {
          'build/app.js': [
            'scripts/requestAnimationFrame.min.js',
            'build/browserify.js'
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: ['scripts/**/*.js'],
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['simplemocha', 'browserify', 'uglify']);
};