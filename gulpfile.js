var gulp = require('gulp');
var del = require('del');
var browserify = require('gulp-browserify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');


gulp.task('default', ['build']);

gulp.task('watch', function () {
	gulp.watch(['index.html', 'assets/**/*', 'src/**/*'], ['build']);
});


gulp.task('clean', function (done) {
	del(['build'], done);
});

gulp.task('lint', function () {
	return gulp.src('src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('assets', ['clean'], function () {
	return gulp.src('assets/**/*')
		.pipe(gulp.dest('build/assets'));
});

gulp.task('index', ['clean'], function () {
	return gulp.src('index.html')
		.pipe(gulp.dest('build'));
});

gulp.task('build', ['lint', 'assets', 'index'], function () {

	return gulp.src('src/main.js')
		.pipe(browserify({
			insertGlobals: false,
			debug: false,

		}))
		.pipe(gulp.dest('build/src'))
});