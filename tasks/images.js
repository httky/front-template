import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from '../config';

const $ = gulpLoadPlugins();

export function images() {
  return gulp
    .src(config.paths.image.src)
    .pipe($.plumber({ errorHandler: $.notify.onError('<%= error.message %>') }))
    .pipe($.if(config.isWatch, $.changed(config.paths.image.dist)))
    .pipe($.if(config.settings.image.minify, $.imagemin()))
    .pipe(gulp.dest(config.paths.image.dist));
}