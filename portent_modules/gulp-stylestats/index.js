'use strict';
// var gutil = require('gulp-util');
var fs = require('fs');
var through = require('through2');
var mkdirp = require('mkdirp');
var StyleStats = require('./node_modules/stylestats/lib/stylestats.js')

function _isDirectory() {
    try {
        var dir = path.join.apply(path, arguments);
        return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
    } catch (e) {
        return false;
    }
}

module.exports = function (options) {
	var filePaths = [];

	return through.obj(function (file, enc, cb) {
		filePaths.push(file.path);
		cb();
	}, function (cb) {
		var stats = new StyleStats(filePaths);
		stats.parse(function(result) {
    		var output = JSON.stringify(result, null, 2);
    		if (options.reportDir) {
    			mkdirp(options.reportDir, function(err) {
    				fs.writeFileSync(/\/$/.test(options.reportDir) ? options.reportDir + 'stylestats.json' : options.reportDir + '/stylestats.json', output);
				});
    		}
    	});
		cb();
	});
};
