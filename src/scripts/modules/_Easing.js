/**
 * @module Easing
 */

const Easing = {
  _Linear: '0.0, 0.0, 1.0, 1.0',
  // sine
  _1_SineIn: '.47, 0, .745, .715',
  _1_SineOut: '.39, .575, .565, 1',
  _1_SineInOut: '.445, .05, .55, .95',
  // quad
  _2_QuadIn: '.55, .085, .68, .53',
  _2_QuadOut: '.25, .46, .45, .94',
  _2_QuadInOut: '.455, .03, .515, .955',
  // cubic
  _3_CubicIn: '.55, .055, .675, .19',
  _3_CubicOut: '.215, .61, .355, 1',
  _3_CubicInOut: '.645, .045, .355, 1',
  // quart
  _4_QuartIn: '.895, .03, .685, .22',
  _4_QuartOut: '.165, .84, .44, 1',
  _4_QuartInOut: '.77, 0, .175, 1',
  // quint
  _5_QuintIn: '.755, .05, .855, .06',
  _5_QuartOut: '.23, 1, .32, 1',
  _5_QuartInOut: '.86, 0, .07, 1',
  // expo
  _6_ExpoIn: '.95, .05, .795, .035',
  _6_ExpoOut: '.19, 1, .22, 1',
  _6_ExpoInOut: '1, 0, 0, 1',
  // circ
  _7_CircIn: '.6, .04, .98, .335',
  _7_CircOut: '.075, .82, .165, 1',
  _7_CircInOut: '.785, .135, .15, .86',
  // inback
  _BackIn: '.6, -0.28, .735, .045',
  _BackOut: '.175, .885, .32, 1.275',
  _BackInOut: '.68, -0.55, .265, 1.55',
};

export default Easing;
