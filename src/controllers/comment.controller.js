import {Post} from '../models/post.model.js';
import {Comment} from '../models/comment.model.js';
import {ApiError,ApiResponse,asyncHandler} from '../utils/index.js';
import mongoose from 'mongoose';


const addComment = asyncHandler(async(req, res)=> {
    const {postId} = req.params;
    const {content} = req.body;

    if(!content) {
        throw new ApiError(400, 'Content is required');
    }

    const post = await Post.findById(postId);
    if(!post) {
        throw new ApiError(404, 'Post does not exist');
    }

    const comment = await Comment.create({
        content,
        post:postId,
        owner:req.user._id
    });

    return res.status(201)
    .json(new ApiResponse(200, {comment}, 'Comment added successfully'));
})


const getComment = asyncHandler(async(req, res)=> {
     const {postId} = req.params;
     const post = await Post.findById(postId);

     if(!post) {
        throw new ApiError(404, 'Post does not exist');
     }

     const comment = await Comment.aggregate([
        {
            $match:{
                post:new mongoose.Types.ObjectId(postId)
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'owner',
                foreignField:'_id',
                as:'owner',
                pipeline:[
                    {
                        $project:{
                            name:1,
                            email:1,
                            avatar:1
                        }
                    }
                ]
            }
        }
     ])

     if(!comment) {
        throw new ApiError(404, 'Comment does not exist');
     }

     return res.status(200)
     .json(new ApiResponse(200, {comment},'Comment fetched successfully'));
})

const deleteComment = asyncHandler(async(req, res)=> {
    const {commentId} = req.params;
    const comment = await Comment.findById(commentId);

    if(!comment) {
        throw new ApiError(404, 'Comment does not exist');
    }

    if(!comment.owner.equals(req.user._id)) {
        throw new ApiError(401, 'Unauthorized to delete this comment');
    }

    await Comment.findByIdAndDelete(commentId, {new:true});

    return res.status(200)
    .json(new ApiResponse(200, {comment}, 'Comment deleted successfully'));
})


const updateComment = asyncHandler(async(req, res)=> {
    const {commentId} = req.params;
    const {content} = req.body;
     if(!content){
        throw new ApiError(400, 'Content is required');
     }
 
    const comment = await Comment.findById(commentId);

    if(!comment) {
        throw new ApiError(404, 'Comment does not exist');
    }

    if(!comment.owner.equals(req.user._id)) {
        throw new ApiError(401, 'Unauthorized to update this comment');
    }

    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {$set:{content}},
        {new:true}
    );

    return res.status(200)
    .json(new ApiResponse(200, {comment:updatedComment}, 'Comment updated successfully'));
})


export {
    addComment,
    getComment,
    deleteComment,
    updateComment
}