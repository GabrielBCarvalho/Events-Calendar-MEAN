import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String, 
        unique: true,
        index: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    }
});

export default mongoose.model('User', User);