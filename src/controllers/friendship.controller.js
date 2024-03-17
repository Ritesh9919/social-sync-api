import mongoose,{isValidObjectId} from 'mongoose';
import { Friendship } from '../models/friendship.model.js';
import {ApiError,ApiResponse,asyncHandler} from '../utils/index.js';


const getUserFriends = asyncHandler(async(req, res)=> {

})


const getPendingFriendRequest = asyncHandler(async(req, res)=> {
    
})


const toggleFriendship = asyncHandler(async(req, res)=> {
     const {friendId} = req.params;
     if(!isValidObjectId(friendId)) {
        throw new ApiError(400, 'Invalid friend id');
     }
    
     const isAlreadyFriend = await Friendship.findOne({requester:req.user._id,recipient:friendId});

     if(isAlreadyFriend) {
        await Friendship.findByIdAndDelete(isAlreadyFriend._id);
        return res.status(200).
        json(new ApiResponse(200, {}, 'Friend deleted successfully'));
     }else{
        const newFriendship = await Friendship.create({requester:req.user._id, recipient:friendId});
        return res.status(201)
        .json(new ApiResponse(200, {friendship:newFriendship},'Friend created successfully'));
     }
     
})

const acceptOrRejectFriendRequest = asyncHandler(async(req, res)=> {
    
})



export{
    getUserFriends,
    getPendingFriendRequest,
    toggleFriendship,
    acceptOrRejectFriendRequest
}
