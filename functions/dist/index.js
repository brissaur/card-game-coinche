"use strict";

var _shuffle = _interopRequireDefault(require("lodash/shuffle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const functions = require('firebase-functions');
/**
 * dataProvider { players: [ { id: 'IEOCmi6TkPJ2G0LEUInH' }, { id: 'Qc9YMPbs9qY9a6NbzofK' }, { id: 'XbPRUknEfzeVCpOuTrRA' }, { id: '3MdqHPfrUOlLK38XZKR1' }]}
 * @type {CloudFunction<DeltaDocumentSnapshot>|*}
 */


exports.dealCards = functions.firestore.document('tables/{tableId}').onCreate(event => {
  const players = event.data.data().players;
  const cards = (0, _shuffle.default)(['7S', '8S', '9S', '10S', 'AS', 'JS', 'QS', 'KS', '7H', '8H', '9H', '10H', 'AH', 'JH', 'QH', 'KH', '7D', '8D', '9D', '10D', 'AD', 'JD', 'QD', 'KD', '7C', '8C', '9C', '10C', 'AC', 'JC', 'QC', 'KC']);

  for (let playerNumber = 0; playerNumber < 4; playerNumber++) {
    players[playerNumber] = assignCardsToPlayer(cards.slice(playerNumber * 8, playerNumber * 8 + 8), players[playerNumber]);
  }

  console.log(players);

  return event.data.ref.set({
    players: players
  });
});

const assignCardsToPlayer = (cards, player) => {
  return _extends({}, player, {
    cards
  });
};