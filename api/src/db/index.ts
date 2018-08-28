import { Firestore } from '@google-cloud/firestore';
import { FIREBASE_PROJECT_ID, GCLOUD_PRIVATE_KEY_FILE } from '../build.properties';

export const firestore = new Firestore({
	projectId: FIREBASE_PROJECT_ID,
    keyFilename: GCLOUD_PRIVATE_KEY_FILE,
});

// prevent warning with Date Objects which will change any soon
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);