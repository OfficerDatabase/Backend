import { model, Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const schema = new Schema({
    name: {
        type: String,
        default: 'Anonymous'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const User = model('users', schema);

export default User;