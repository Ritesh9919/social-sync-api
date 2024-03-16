import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    likedBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Types.ObjectId,
        ref:'Post'
    },
    comment:{
        type:mongoose.Types.ObjectId,
        ref:'Comment'
    }
},{timestamps:true});


export const Like = mongoose.model('Like', likeSchema);