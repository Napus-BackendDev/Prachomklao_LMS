import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import * as path from 'path';


// When we Deploy 
const serviceAccount = JSON.parse(
  readFileSync('/etc/secrets/firebasekey.json', 'utf8'),
);

// const serviceAccount = JSON.parse(
//   readFileSync(path.resolve(process.cwd(), 'config/firebasekey.json'), 'utf8'),
// );


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const firestore = admin.firestore();