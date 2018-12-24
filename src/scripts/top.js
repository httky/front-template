/**
 *  @file indexページのスクリプト
 */

import mediaQueries from './modules/_MediaQueries';
import { alignHeight } from './modules/_utils';
import YTPlayer from './modules/_YTPlayer';
import Profiler from './modules/_Profiler';
import Param from './modules/_Param';

const controls = {
  bouncingSpeed: { value: 0.03, min: 0, max: 0.5 },
  slideRate: { value: 1.0, min: 0, max: 1.0 },
  offset: { value: 1.0, min: 0, max: 1.0 },
  color: { value: '#0c0c0c' },
};
const profiler = new Profiler(0);
const param = new Param(controls);
const $card = $('.card');

function alignCardHeight() {
  $card.height('');
  alignHeight($card, 3);
}

function update() {
  profiler.update();
  $card.css({ color: param.controls.color });
  requestAnimationFrame(update);
}

const debouncedAlignCardHeight = _.debounce(alignCardHeight, 100);

function enterPC() {
  alignCardHeight();
}

function exitPC() {}

function enterSP() {
  debouncedAlignCardHeight.cancel();
  $(window).off('resize.alignCardHeight');
  $card.height('');
}

function exitSP() {
  alignCardHeight();
  $(window).on('resize.alignCardHeight', debouncedAlignCardHeight);
}

$(() => {
  // YouTube埋め込み[オプション](https://developers.google.com/youtube/player_parameters?hl=ja)
  const ytOptions = {
    rel: 0, // 関連動画を表示させない
    showinfo: 0, // 動画の再生が始まる前に動画のタイトルなど情報を表示させない
    controls: 0, // プレーヤー コントロールを表示させない
    loop: 1, // 動画を繰り返し表示
  };

  const ytPlayer = new YTPlayer('youtube', 'rbb192bVGAU', 640, 390, ytOptions);
  requestAnimationFrame(update);

  mediaQueries.enter((currentType, prevType) => {
    switch (prevType) {
      case 'PC':
        exitPC();
        break;
      case 'SP':
        exitSP();
        break;
      default:
        break;
    }

    switch (currentType) {
      case 'PC':
        enterPC();
        break;
      case 'SP':
        enterSP();
        break;
      default:
        break;
    }
  });
});
