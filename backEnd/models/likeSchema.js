import mongoose, { Schema } from 'mongoose';

const likeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    type: {
        type: String,
        enum: ['music', 'comment', 'playlist'],
    },
    music: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music',
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    },
    playlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
    }
},{
    timestamp: true
});

export default mongoose.model('Like', likeSchema);