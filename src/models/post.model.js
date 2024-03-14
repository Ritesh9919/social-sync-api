import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});


export const Post = mongoose.model('Post', postSchema);