var
gulp = require('gulp');

gulp.task(
    'default', [
        'clean',
        'html',
        'styles',
        'scripts',
        'assets'
    ]
);