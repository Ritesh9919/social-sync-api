import mongoose from 'mongoose';

const friendshipSchema = new mongoose.Schema({
    requester:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    recipient:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
},{timestamps:true});


export const Friendship = mongoose.model('Friendship', friendshipSchema);