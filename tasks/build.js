import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', (callback) => {
  runSequence(
    'clean',
    [
      // 'sharePage', // shareページ生成
      'copy',
      'views',
      'scripts:libs',
      'styles',
      'scripts',
      'images',
    ],
    callback,
  );
});
