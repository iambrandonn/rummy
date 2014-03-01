module.exports = function(grunt) {
  grunt.initConfig({
    simplemocha: {
      all: {
        src: ['test/**/*.js']
      }
    },
    uglify: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          'build/app.js': [
            'scripts/TweenLite.min.js',
            'scripts/requestAnimationFrame.min.js',
            'scripts/card.js',
            'scripts/deck.js',
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
      }
    }
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['simplemocha', 'uglify']);
};