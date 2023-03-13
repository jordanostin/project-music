import mongoose, { Schema } from 'mongoose';
import userSchema from './userSchema.js';
import musicSchema from './musicSchema.js';
import comSchema from './comSchema.js';

const likeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    music: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music',
        required: true,
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
    }
},{
    timestamp: true
});

export default mongoose.model('Like', likeSchema);