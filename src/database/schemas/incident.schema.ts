import { model, Schema } from 'mongoose';
// @ts-ignore
import autoIncrement from 'mongoose-auto-increment';

const schema = new Schema({
    title: {
        type: String,
        default: '',
        max: 100
    },
    content: {
        type: String,
        required: true,
        min: 50,
        max: 2054
    },
    officer: {
        type: Number,
        ref: 'officers',
        default: -1
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        state: {
            name: {
                type: String,
                default: 'Unknown'
            },
            value: {
                type: Number,
                default: -1
            }
        },
        city: {
            name: {
                type: String,
                default: 'Unknown'
            },
            value: {
                type: Number,
                default: -1
            }
        }
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

schema.plugin(autoIncrement.plugin, 'incidents');

const Incident = model('incidents', schema);

export default Incident;