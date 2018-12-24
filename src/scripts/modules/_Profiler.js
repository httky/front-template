/**
 * @module Profiler
 */
import Stats from 'stats-js';

/**
 * stats.jsのラッパークラス
 * @param {number} mode - 0 || 1
 */
class Profiler {
  constructor(mode) {
    this.stats = new Stats();
    this.stats.setMode(mode); // 0: fps, 1: ms
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';
    this.stats.domElement.style.zIndex = '99999';
    document.body.appendChild(this.stats.domElement);
  }

  update() {
    this.stats.update();
  }
}

export default Profiler;
