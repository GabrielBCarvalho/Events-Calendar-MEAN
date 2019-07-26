import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Participants = new Schema({
    idEvent: {
        type: String
    },
    idUser: {
        type: String
    }
});

export default mongoose.model('Participants', Participants);