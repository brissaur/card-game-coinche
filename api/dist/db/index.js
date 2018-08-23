"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("@google-cloud/firestore");
const build_properties_1 = require("../build.properties");
exports.firestore = new firestore_1.Firestore({
    projectId: build_properties_1.FIREBASE_PROJECT_ID,
    keyFilename: build_properties_1.GCLOUD_PRIVATE_KEY_FILE,
});
// prevent warning with Date Objects which will change any soon
const settings = { timestampsInSnapshots: true };
exports.firestore.settings(settings);
//# sourceMappingURL=index.js.map