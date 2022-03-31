import admin from "firebase-admin"
//TODO: import private key
import * as serviceAccount from "../../test-e60e3-firebase-adminsdk-9v0i1-5445599726.json"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default admin