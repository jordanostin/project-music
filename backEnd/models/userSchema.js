import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    isAdmin: {
        type: Boolean, 
        default: false
    }
},{
    timestamp: true
});

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})



userSchema.methods.createJWT = function () {
    return jwt.sign({
        id: this._id,
        email: this.email
    }, 'key_secret', {expiresIn: '24h'})
}

userSchema.statics.decodeJWT = async function (token) {
    try {
    const decoded = jwt.verify(token, 'key_secret');
    const user = await this.findOne({ email: decoded.email });

    if (!user) {
    console.log('User not found');
    }
    return user;
    } catch (error) {
            console.log('JWT decoding error');
    }
};


export default mongoose.model('User', userSchema);