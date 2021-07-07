import gulp from 'gulp';
import { apiServer } from './tasks/apiServer';
import { server } from './tasks/server';
import { watch } from './tasks/watch';
import { clean, cleanDoc } from './tasks/clean';
import { copy } from './tasks/copy';
import { views } from './tasks/views';
import { styles } from './tasks/styles';
import { scripts, scriptLibs } from './tasks/scripts';
import { images } from './tasks/images';
import config from './config';

const defaultTasks = [];

defaultTasks.push(watch);
if (config.settings.apiServer) { // API serverを使う場合、事前にAPIサーバを立てる
  defaultTasks.push(apiServer);
}
defaultTasks.push(server);

exports.default = gulp.series.apply(this, defaultTasks);

exports.build = gulp.series(
  clean,
  gulp.parallel(
    // sharePage
    copy,
    views,
    scriptLibs,
    styles,
    scripts,
    images
  )
);