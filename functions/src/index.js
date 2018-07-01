import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { addCardPlayed, deleteCardPlayed } from './cardsPlayed/index';
import { addPlayer } from './players/index';
import { updateTable } from './tables/index';
import { addTrick } from './tricks/index';
import { onAnnounce } from './announces';

admin.initializeApp(functions.config().firebase);

exports.addCardPlayed = addCardPlayed;
exports.deleteCardPlayed = deleteCardPlayed;

exports.addPlayer = addPlayer;

exports.updateTable = updateTable;

exports.addTrick = addTrick;

exports.onAnnounce = onAnnounce;
