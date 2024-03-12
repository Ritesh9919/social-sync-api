import {User} from '../models/user.model.js';
import {asyncHandler, ApiError,ApiResponse,uploadOnCloudinary} from '../utils/index.js';



const userSignup = asyncHandler(async(req, res)=> {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    const user = await User.findOne({email});
    if(user) {
        throw new ApiError(409, 'User already exist');
    }
    console.log(req.file);
    const userAvatarLocalPath = req.file?.path;
    if(!userAvatarLocalPath) {
        throw new ApiError(400, 'Avatar file is required');
    }

    const userAvatar = await uploadOnCloudinary(userAvatarLocalPath);
    if(!userAvatar) {
        throw new ApiError(400, 'Avatar file is required');
    }

    const createdUser = await User.create({
        name,
        email,
        password,
        avatar:userAvatar?.url
    })

    return res.status(201)
    .json(new ApiResponse(200, createdUser, 'User signup successfully'));


})


const userSignin = asyncHandler(async(req, res)=> {
    
})


const userLogout = asyncHandler(async(req, res)=> {
    
})



export {
    userSignup,
    userSignin,
    userLogout
}