var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('styles', function() {
  gulp.src(['static/css/**/*.css'])
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  gulp.src(['static/js/**/*.js'])
    .pipe(gulp.dest('build/js/'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['scripts', 'styles'], function(){
  browserSync.init({
    server: './',
    browser: ['firefox']
  });
  gulp.watch('static/css/**/*.css', ['styles']);
  gulp.watch('static/js/**/*.js', ['scripts']);
  gulp.watch('*.html', browserSync.reload);
});