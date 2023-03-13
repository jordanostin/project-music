import mongoose, { Schema } from 'mongoose';
import userSchema from './userSchema.js';
import musicSchema from './musicSchema.js';
import comSchema from './comSchema.js';

const likeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    music: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music',
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }
},{
    timestamp: true
});

export default mongoose.model('Like', likeSchema);