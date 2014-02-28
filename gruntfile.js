module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'build/app.js': ['scripts/app.js'],
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify']);
};