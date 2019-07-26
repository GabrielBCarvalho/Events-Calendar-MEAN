import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Event = new Schema({
    description: {
        type: String
    },
    dateBegin: {
        type: Date
    },
    dateEnd: {
        type: Date
    },
    username: {
        type: String
    }
});

export default mongoose.model('Event', Event);