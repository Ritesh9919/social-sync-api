
import mongoose from 'mongoose';
import {Like} from '../models/like.model.js';
import {Comment} from '../models/comment.model.js';
import {Post} from '../models/post.model.js';
import {ApiError,ApiResponse,asyncHandler} from '../utils/index.js';



const togglePostLike = asyncHandler(async(req, res)=> {
       const {postId} = req.params;
       const post = await Post.findById(postId);
       if(!post ) {
        throw new ApiError(404, 'Post does not exist');
       }

       let deleted = false;

       let isLikeExist = await Like.findOne({likedBy:req.user._id, post:postId});
       if(isLikeExist) {
        await isLikeExist.deleteOne()
        deleted = true;
       }else{
        await Like.create({
            likedBy:req.user._id,
            post:postId
        })
        deleted = false;
       }

       return res.status(201)
       .json(new ApiResponse(200, {deleted}, deleted ? 'Disliked':'Liked'));
})

const toggleCommentLike = asyncHandler(async(req, res)=> {
    const {commentId} = req.params;
    const comment = await Comment.findById(commentId);
    if(!comment ) {
     throw new ApiError(404, 'Post does not exist');
    }

    let deleted = false;

    let isLikeExist = await Like.findOne({likedBy:req.user._id, comment:commentId});
    if(isLikeExist) {
     await isLikeExist.deleteOne()
     deleted = true;
    }else{
     await Like.create({
         likedBy:req.user._id,
         comment:commentId
     })
     deleted = false;
    }

    return res.status(201)
    .json(new ApiResponse(200, {deleted}, deleted ? 'Disliked':'Liked'));
})

const getPostLike = asyncHandler(async(req, res)=> {
    
})

const getCommentLike = asyncHandler(async(req, res)=> {
    
})



export{
    toggleCommentLike,
    togglePostLike,
    getCommentLike,
    getPostLike
}