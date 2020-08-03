import { model, Schema } from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        default: 'Anonymous'
    },
    age: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    ethnicity: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const User = model('users', schema);

export default User;