var gulp = require('gulp'),
 	browserSync = require('browser-sync'),
 	es = require('event-stream'),
 	mainBowerFiles = require('main-bower-files'),
	plugins = require('gulp-load-plugins')();


gulp.task('default', ['scripts','styles','html','browser-sync'], function() {
    gulp.watch("app/*.*", ['scripts', browserSync.reload]);
    gulp.watch("styles/app.scss", ['styles']);
    gulp.watch("index.html", ['html']);
});

gulp.task('styles', function() {

    var stream = gulp.src('styles/app.scss')
        .pipe(plugins.rubySass())
        .pipe(gulp.dest('./dist/css'));

    return stream;
});

gulp.task('scripts', function() {
	
	var stream = gulp.src('app/app.js')
        .pipe(gulp.dest('./dist/js'));

    return stream;
});

// copy html and inject js files, after they have been copied to dist

gulp.task('html', ['app','bower','styles'], function() {

	var scriptLoadOrder = 	[
								'**/jquery.js',
								'**/angular.js',
								'**/vendor/**/*.*',
								'**/app/**/*.*'
							];
							

	var target = gulp.src(['*.html']);

	var sources = es.merge(
					gulp.src(['dist/js/vendor/*.*'], {read:true}),
					gulp.src(['dist/js/app/**/*.js'], {read:true}),
					gulp.src(['dist/css/*.css'], {read: true})
				)
					.pipe(plugins.order(scriptLoadOrder));

	var stream = target
					.pipe(plugins.inject(sources, {'ignorePath':'/dist'}))
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

gulp.task('browser-sync', ['html'], function() {
	
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
