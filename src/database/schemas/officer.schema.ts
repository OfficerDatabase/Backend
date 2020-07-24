import { model, Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const schema = new Schema({
    fullname: {
        type: String,
        default: 'Unknown',
        max: 30
    },
    badge: {
        type: String,
        default: 'Unknown',
        max: 7
    },
    incidents: [
        {
            type: Number,
            ref: 'incidents'
        } 
    ],
    latest_incident: {
        type: Number,
        ref: 'incidents',
        default: -1
    },
    picture: {
        type: String,
        default: '/images/default_profile.png'
    },
    location: {
        type: String,
        default: 'Unknown'
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

schema.plugin(autoIncrement.plugin, 'officers');

const Officer = model('officers', schema);

export default Officer;