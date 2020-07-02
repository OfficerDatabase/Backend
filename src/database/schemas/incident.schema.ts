import { model, Schema } from 'mongoose';
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
        ref: 'officer',
        default: -1
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

schema.plugin(autoIncrement.plugin, 'incident')

const Incident = model('incident', schema);

export default Incident;