import path from 'path';
import gulp from 'gulp';
import del from 'del';
import gulpLoadPlugins from 'gulp-load-plugins';
import { reloadServer } from '../tasks/server';
import { copy } from '../tasks/copy';
import { views } from '../tasks/views';
import { styles } from '../tasks/styles';
import { scripts } from '../tasks/scripts';
import { images } from '../tasks/images';
import config from '../config';

const $ = gulpLoadPlugins();

export function watch(callback) {
  config.isWatch = true;

  const imagesWatcher = $.watch(
    config.paths.image.watch,
    gulp.series(images, reloadServer)
  );
  const staticWatcher = $.watch(
    config.paths.static.watch,
    gulp.series(copy, reloadServer)
  );
  $.watch(
    config.paths.view.watch,
    gulp.series(views, reloadServer)
  );
  $.watch(
    config.paths.style.watch,
    gulp.series(styles, reloadServer)
  );
  $.watch(
    config.paths.script.watch,
    gulp.series(scripts, reloadServer)
  );

  imagesWatcher.on('unlink', (filePath) => {
    const filePathFromSrc = path.relative(config.paths.image.dir, filePath);
    const destFilePath = path.resolve(config.paths.image.dist, filePathFromSrc);
    del.sync(destFilePath);
  });

  staticWatcher.on('unlink', (filePath) => {
    const filePathFromSrc = path.relative(config.paths.static.dir, filePath);
    const destFilePath = path.resolve(config.paths.static.dist, filePathFromSrc);
    del.sync(destFilePath);
  });

  callback();
}
