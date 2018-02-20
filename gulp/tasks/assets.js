var 
gulp = require('gulp'),
del = require('del');

gulp.task('assets', function() {
    del.sync('./public/assets/**/*', {force: true});
    return gulp.src('./source/assets/**/*')
        .pipe(gulp.dest('./public/assets'));
});