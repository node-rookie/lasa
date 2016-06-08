var gulp = require('gulp');
var path = require('path');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var webpackConfig = require('../webpack.config');
var webPath = './web';

gulp.task('watch-webpack', function () {
    gulp.watch([path.join(webPath, '/**/**/*.js'), path.join(webPath, '/**/*.html')], ['webpack']);
});
gulp.task("webpack", function() {
    return gulp
        .src('./web/js/app/*.js')
        .pipe(webpack(webpackConfig))
        .pipe(uglify())
        .pipe(gulp.dest('./public/build/js'))
});