import mongoose from 'mongoose';

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
    like:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }
},{
    timestamps: true
});

export default mongoose.model('Music', musicSchema);