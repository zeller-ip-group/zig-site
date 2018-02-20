var 
gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

var
browserSyncOpts = {
    server: {
        baseDir:'./public',
    }
};

gulp.task('watch', function() {
    browserSync.init(browserSyncOpts);

    watch('./source/**/*.html', function() {
        gulp.start('html');
        browserSync.reload();
    });

    watch('./source/styles/**/*.css', function() {
        gulp.start('styles');
        browserSync.reload();
    });

    watch('./source/scripts/**/*.js*', function() {
        gulp.start('scripts');
        browserSync.reload();
    });

    watch('./source/assets/**/*', function() {
        gulp.start('assets');
        browserSync.reload();
    });
});