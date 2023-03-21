import mongoose from 'mongoose';

const comSchema = mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName:{
        type: String
    },
    content: {
        type: String
    },
    type: {
        type: String,
        enum: ['music', 'comment', 'playlist'],
    },
    music: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music'
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