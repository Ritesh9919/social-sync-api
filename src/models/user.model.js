import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    }
},{timestamps:true});



userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.isPasswordCurrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function() {
   const token = await jwt.sign({userId:this._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
   return token;
}


export const User = mongoose.model('User', userSchema);