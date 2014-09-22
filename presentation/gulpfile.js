var gulp = require('gulp'),
	connect = require('gulp-connect');


// default task

gulp.task('default', ['connect']);


// static server

gulp.task('connect', function() {

	connect.server({
    	port: 9001
  });
});

