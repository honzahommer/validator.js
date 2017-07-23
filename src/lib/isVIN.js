import assertString from './util/assertString';

const transliteration = function (char) {
  return '0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ'.indexOf(char) % 10;
};

const weights = function (index) {
  return [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2][index];
};

export default function isVIN(str) {
  assertString(str);

  let vin = str.toUpperCase().split('');

  let mod = vin
    .map((char, i) => transliteration(char) * weights(i))
    .reduce((total, value) => total + value, 0) % 11;

  return (mod === 10) ? vin[8] === 'X' : (vin[8] === mod.toString());
}
