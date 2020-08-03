import path from 'path';

export class FirebaseFile {
    public name: string;
    public readonly contentType: string;
    public readonly extension: string;
    public readonly buffer: Buffer;
    public readonly location: string;

    constructor(name: string, contentType: string, buffer: Buffer, location: string, original: string) {
        this.name = name;
        this.extension = path.extname(original).slice(1);
        this.contentType = contentType;
        this.buffer = buffer;
        this.location = location;
    }

    public getUrl(bucketName: string): string {
        if (!bucketName) throw 'Bucket name cannot be empty|undefined|null';

        const name = this.contentType.startsWith('image/') ? `${ this.name }_500x500` : this.name;
        const firebase_url = 'https://firebasestorage.googleapis.com';
        const filePath = encodeURIComponent(`${ this.location }/${ name }.${ this.extension }`);
        return `${ firebase_url }/v0/b/${ bucketName }/o/${ filePath }?alt=media`;
    }
}