var 
gulp = require('gulp'),
del = require('del');

gulp.task('html', function() {
    del.sync('./public/*.html', {force: true});
    return gulp.src('./source/*.html')
        .pipe(gulp.dest('./public/'));
});