const Firestore = require('@google-cloud/firestore');
const config = require('../build.properties');

const firestore = new Firestore({
	projectId: config.FIREBASE_PROJECT_ID,
    keyFilename: config.GCLOUD_PRIVATE_KEY_FILE,
});

// prevent warning with Date Objects which will change any soon
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

module.exports = firestore;
