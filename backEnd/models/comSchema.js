import mongoose from 'mongoose';
import userSchema from './userSchema.js'
import musicSchema from './musicSchema.js'

const comSchema = mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    music: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music'
    },
    content: {
        type: String
    },
    like:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }
},{
    timestamp: true
});

export default mongoose.model('Comment', comSchema);