import gulp from 'gulp';
import { clean, cleanDoc } from './tasks/clean';
import { copy } from './tasks/copy';
import { views } from './tasks/views';
import { styles } from './tasks/styles';
import { scripts, scriptLibs } from './tasks/scripts';
import { images } from './tasks/images';

// gulp.task('build', (callback) => {
//   runSequence(
//     'clean',
//     [
//       // 'sharePage', // shareページ生成
//       'copy',
//       'views',
//       'scripts:libs',
//       'styles',
//       'scripts',
//       'images',
//     ],
//     callback,
//   );
// });

function defaultTask(cb) {
  console.log('defaultTask');
  // place code for your default task here
  cb();
}

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
exports.default = defaultTask;
