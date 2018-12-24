/**
 * @module Param
 */
import dat from 'dat-gui';

/**
 * dat.GUIのラッパークラス
 * @param {object} controls
 */
class Param {
  constructor(controls) {
    this.gui = new dat.GUI();
    this.controls = {};
    this._init(controls);
    this._add(controls);
  }

  _init(obj) {
    // objからvalueキーだけを取り出したオブジェクトを生成する
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const val = obj[key].value;
        this.controls[key] = val;
      }
    }
  }

  _add(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const val = obj[key];
        if (key.indexOf('color') >= 0) {
          this.gui.addColor(this.controls, key);
        } else if (typeof val.list !== 'undefined' && val.list !== null) {
          this.gui.add(this.controls, key, val.list);
        } else {
          this.gui.add(this.controls, key, val.min, val.max);
        }
      }
    }
  }
}

export default Param;
