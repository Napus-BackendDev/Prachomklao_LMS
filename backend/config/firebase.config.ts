import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import * as path from 'path';

const serviceAccount = JSON.parse(
  readFileSync(path.resolve(process.cwd(), 'config/firebasekey.json'), 'utf8'),
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const firestore = admin.firestore();