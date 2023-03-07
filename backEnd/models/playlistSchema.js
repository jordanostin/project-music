import mongoose from 'mongoose';
import userSchema from './userSchema.js'
import musicSchema from './articleSchema.js'

const comSchema = mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String
    },
    musics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music'
    }]
},{
    timestamp: true
});

export default mongoose.model('Comment', comSchema);