import {User} from '../models/user.model.js';
import {asyncHandler, ApiError,ApiResponse,uploadOnCloudinary} from '../utils/index.js';



const userSignup = asyncHandler(async(req, res)=> {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    const existedUser = await User.findOne({email});
    if(existedUser) {
        throw new ApiError(409, 'User already exist');
    }
    
    const userAvatarLocalPath = req.file?.path;
    if(!userAvatarLocalPath) {
        throw new ApiError(400, 'Avatar file is required');
    }

    const userAvatar = await uploadOnCloudinary(userAvatarLocalPath);
    if(!userAvatar) {
        throw new ApiError(400, 'Avatar file is required');
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar:userAvatar?.url
    });

    const createdUser = await User.findById(user._id).select('-password');



    return res.status(201)
    .json(new ApiResponse(200, createdUser, 'User signup successfully'));


})


const userSignin = asyncHandler(async(req, res)=> {
    const {email,password} = req.body;
    if(!email || !password) {
        throw new ApiError(400, 'Both fields are required');
    }

    const isUserExist = await User.findOne({email});
    if(!isUserExist) {
        throw new ApiError(404, 'User does not exist');
    }

    const isPasswordCurrect = await isUserExist.isPasswordCurrect(password);
    if(!isPasswordCurrect) {
        throw new ApiError(401, 'Invalid Credential');
    }

    const user = await User.findById(isUserExist._id).select('-password');
    const accessToken = await user.generateAccessToken();

    return res.status(200)
    .cookie('accessToken', accessToken, {httpOnly:true,secure:true})
    .json(new ApiResponse(200, {user:user, accessToken}, 'User login successfully'));



    
})


const userLogout = asyncHandler(async(req, res)=> {
    return res.status(200)
    .clearCookie('accessToken')
    .json(new ApiResponse(200, {}, 'Logout successfully'));
})


const logoutUserFromAllDevices = asyncHandler(async(req, res)=> {

})


const getUser = asyncHandler(async(req,res)=> {
    const {userId} = req.params;
     const user = await User.findById(userId).select('-password');
     if(!user) {
        throw new ApiError(404, 'User does not exist');
     }

     return res.status(200)
     .json(new ApiResponse(200, {user:user}, 'User details fetched successfully'));
     
})


export {
    userSignup,
    userSignin,
    userLogout,
    logoutUserFromAllDevices,
    getUser
}