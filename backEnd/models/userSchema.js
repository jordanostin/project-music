import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/,

    },
    password:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})



userSchema.methods.createJWT = function () {
    return jwt.sign({
        id: this._id,
        email: this.email
    }, process.env.JWT, {expiresIn: '24h'})
}

userSchema.statics.decodeJWT = async function (token) {
    try {
    const decoded = jwt.verify(token, process.env.JWT);
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