'use strict';

module.exports = function (grunt) {

  var path = require('path');

  grunt.registerMultiTask('inject_livereload', 'Injects livereload script into index.html', function() {

    var filePath = path.resolve(this.filesSrc[0]);
    var content = grunt.file.read(filePath);
    var replace = content.match('<body>(.*)</body>')[0].replace('</body>', '');
    var replacement = replace + '<script src="//localhost:35729/livereload.js"></script></body>';
    var newContent = content.replace(replace, replacement);

    grunt.file.write(filePath, newContent, 'utf8');
    grunt.log.ok('Livereload script successfully injected.');
  });

};