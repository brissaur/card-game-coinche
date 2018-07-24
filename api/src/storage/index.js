const Firestore = require('@google-cloud/firestore');
const config = require('../build.properties');

const firestore = new Firestore({
	projectId: config.FIREBASE_PROJECT_ID,
	keyFilename:
		'/Users/busson-arnaud/Sites/card-game-coinche/api/card-game-coinche-f9dad125fcc4.json'
});

// prevent warning with Date Objects which will change any soon
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

module.exports = firestore;
