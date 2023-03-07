import mongoose from 'mongoose';
import userSchema from './userSchema.js';

const musicSchema = mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    image:{
        type: String
    },
    audio: {
        type: String
    },
},{
    timestamp: true
});

export default mongoose.model('Music', musicSchema);