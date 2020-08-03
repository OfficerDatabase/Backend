// @ts-ignore
import * as Firebase from 'firebase-admin';
import { FirebaseFile } from './classes';

export default {
    sendErrorIf(res, error?: string | Object, status?: number) {
        if (error) {
            this.sendError(res, error, status);
            return true;
        }

        return false;
    },
    sendError(res, error: any = 'Internal error', status = 500) {
        console.error(error);
        res.status(status).json((status === 500) ? 'Internal error' : { error });
    },
    authenticated(req, res, next) {
        return this.sendError(res, 'Unauthenticated', 401);
    },
    async uploadFile(file: FirebaseFile): Promise<string> {
        const storage = Firebase.storage();
        const bucket = storage.bucket();
        const bucketFile = bucket.file(`${file.location}/${file.name}.${file.extension}`);

        await bucketFile.save(file.buffer, { contentType: 'auto' });

        return file.getUrl(bucket.name);
    }
};