import mongoose from 'mongoose';
import { Friendship } from '../models/friendship.model.js';
import {ApiError,ApiResponse,asyncHandler} from '../utils/index.js';


const getUserFriends = asyncHandler(async(req, res)=> {

})


const getPendingFriendRequest = asyncHandler(async(req, res)=> {
    
})


const toggleFriendship = asyncHandler(async(req, res)=> {
    
})

const acceptOrRejectFriendRequest = asyncHandler(async(req, res)=> {
    
})



export{
    getUserFriends,
    getPendingFriendRequest,
    toggleFriendship,
    acceptOrRejectFriendRequest
}
