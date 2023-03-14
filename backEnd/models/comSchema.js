import mongoose from 'mongoose';
import userSchema from './userSchema.js'
import musicSchema from './musicSchema.js'

const comSchema = mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['music', 'comment', 'playlist'],
    },
    music: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music'
    },
    content: {
        type: String
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    },
    playlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
    },
    like:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }
},{
    timestamp: true
});

export default mongoose.model('Comment', comSchema);