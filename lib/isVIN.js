'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isVIN;

var _assertString = require('./util/assertString');

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transliteration = function transliteration(char) {
  return '0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ'.indexOf(char) % 10;
};

var weights = function weights(index) {
  return [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2][index];
};

function isVIN(str) {
  (0, _assertString2.default)(str);

  var vin = str.toUpperCase().split('');

  var mod = vin.map(function (char, i) {
    return transliteration(char) * weights(i);
  }).reduce(function (total, value) {
    return total + value;
  }, 0) % 11;

  return mod === 10 ? vin[8] === 'X' : vin[8] === mod.toString();
}
module.exports = exports['default'];