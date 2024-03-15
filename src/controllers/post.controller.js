import mongoose from 'mongoose';
import {Post} from '../models/post.model.js';
import {ApiError,ApiResponse,asyncHandler,uploadOnCloudinary} from '../utils/index.js';




const createPost = asyncHandler(async(req, res)=> {
   const {caption} = req.body;
   if(!caption) {
    throw new ApiError(400, 'Caption is required');
   }

   const captionImageLocalPath = req.file?.path;
   if(!captionImageLocalPath) {
    throw new ApiError(400, "Caption image file is required");
   }

   const captionImage = await uploadOnCloudinary(captionImageLocalPath);
   if(!captionImage) {
    throw new ApiError(400, "Caption image file is required");
   }

   const post = await Post.create({
    caption,
    imageUrl:captionImage?.url,
    owner:req.user._id
   })

   return res.status(201)
   .json(new ApiResponse(200, {post:post}, 'Post created successfully'));
})


const getPostByUser = asyncHandler(async(req, res)=> {
    const {postId} = req.params;

   const post = await Post.aggregate([
    {
        $match:{
            _id:new mongoose.Types.ObjectId(postId)
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
                        email:1
                    }
                }
            ]

        }
    }
   ]);

   if(!post) {
    throw new ApiError(400, 'Posts does not exist');
  }
   
    return res.status(200)
    .json(new ApiResponse(200, {post:post[0]}, 'Post fetched successfully'));
})

const getAllPostByUser = asyncHandler(async(req, res)=> {
      const posts = await Post.aggregate([
        {
            $match:{
                owner:new mongoose.Types.ObjectId(req.user._id)
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
                            email:1
                        }
                    }
                ]
            }
        }
      ])

      if(!posts) {
        throw new ApiError(400, 'Posts does not exist');
      }

      return res.status(200)
      .json(new ApiResponse(200, {posts:posts}, 'Posts fetched successfully'));
})

const deletePost = asyncHandler(async(req, res)=> {

})

const updatePost = asyncHandler(async(req, res)=> {

})


export{
    createPost,
    getPostByUser,
    getAllPostByUser,
    deletePost,
    updatePost
}



