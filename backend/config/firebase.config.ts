import * as admin from 'firebase-admin';
import * as fs from 'fs';

if (!process.env.FIREBASE_KEY) {
  throw new Error('FIREBASE_KEY environment variable is not set.');
}

const serviceAccount = JSON.parse(fs.readFileSync('/etc/secrets/firebasekey.json', 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const firestore = admin.firestore();