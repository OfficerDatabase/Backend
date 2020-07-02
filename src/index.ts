import env from 'dotenv';
const { error } = env.config();

import db from './database';

(() => new Promise<unknown>((resolve, reject) => {

    if (error) {
        return reject(error);
    }

    const handle = async () => {
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