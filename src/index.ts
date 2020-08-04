import db from './database';
import * as Firebase from 'firebase-admin';
// @ts-ignore
import * as FirebaseConfig from './firebase.config.json';

(() => new Promise<unknown>((resolve, reject) => {
    const handle = async () => {

        Firebase.initializeApp({
            // @ts-ignore
            credential: Firebase.credential.cert(FirebaseConfig),
            storageBucket: 'officerdb-665a8.appspot.com'
        });

        await db.connect();
        console.log('Connected to database!');
        await import('./app');
        console.log('Starting http server');
    };

    handle()
        .then(resolve)
        .catch(reject);

}))()
    .then(() => console.log('Http server started successfully'))
    .catch(console.error);