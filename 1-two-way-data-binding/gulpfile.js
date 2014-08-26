var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	connect = require('gulp-connect'),
	filter = require('gulp-filter'),
	sass = require('gulp-ruby-sass'),
	mainBowerFiles = require('main-bower-files'),
	inject = require('gulp-inject'),
	order = require('gulp-order'),
	es = require('event-stream'),
	clean = require('gulp-rimraf');


// default task

gulp.task('default', ['build','watch','browser-sync']);

// clean

gulp.task('clean', function() {
	return gulp.src('./dist')
			   .pipe(clean());
});


// watch

gulp.task('watch', function() {
	gulp.watch(['styles/app.scss'], ['sass']);
	gulp.watch(['index.html'], ['build', browserSync.reload]);
	gulp.watch(['app/**/*.*'], ['app', browserSync.reload]);
});


// static server

gulp.task('browser-sync', function() {

	var config = {
		open: false,
		port: 3000,
		notify: false,
		server: {
			baseDir: 'dist'
		}
	};

    browserSync(config);
});



// build

gulp.task('build', ['sass', 'app','bower','html']);


// synchronous build tasks


// compile sass with sourcemaps and only reload css files

gulp.task('sass',function() {
	var stream = gulp.src('styles/app.scss')
			   		.pipe(sass({sourcemap: true}))
			   		.pipe(gulp.dest('dist/css'))
			   		.pipe(filter('**/*.css')) 
        			.pipe(browserSync.reload({stream:true}));

	return stream;
});

// copy html and inject js files, after they have been copied to dist

gulp.task('html', ['app','bower'], function() {

	var scriptLoadOrder = 	[
								'**/jquery.js',
								'**/angular.js',
								'**/vendor/**/*.*',
								'**/app/**/*.*'
							];
							

	var target = gulp.src('index.html');

	var sources = es.merge(
					gulp.src(['dist/js/vendor/*.*'], {read:true}),
					gulp.src(['dist/js/app/**/*.js'], {read:true}),
					gulp.src(['dist/css/*.css'], {read: true})
				)
					.pipe(order(scriptLoadOrder));

	var stream = target
					.pipe(inject(sources, {'ignorePath':'/dist'}))
					.pipe(gulp.dest('dist'));


	return stream;
});

// copy js files in app over to dist

gulp.task('app', function() {
	var stream = gulp.src('app/**/*.*')
					.pipe(gulp.dest('dist/js/app/'));

	return stream;

});

// copy bower development libs over to dist

gulp.task('bower', function() {
	var stream = gulp.src(mainBowerFiles({'env':'development'}))
					.pipe(gulp.dest('dist/js/vendor'));

	return stream;

});

