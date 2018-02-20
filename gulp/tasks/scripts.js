var
gulp = require('gulp'),
del = require('del'),
webpack = require('webpack');

gulp.task('scripts', function(callback) {
    del.sync('../../public/scripts/', {force: true});
    webpack(require('../../webpack.config.js'), function(err, stats) {
        if (err) {
            console.log(err.toString());
        }

        console.log(stats.toString());
        callback();
    });
    return gulp.src('./source/scripts/vendor/**/*')
        .pipe(gulp.dest('./public/scripts/vendor'));
});