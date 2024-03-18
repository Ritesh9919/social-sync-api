import { User } from "../models/user.model.js";
import {ApiResponse,asyncHandler,ApiError,generateOtp,sendOtp} from '../utils/index.js';


const sendResetPasswordOtp = asyncHandler(async(req, res)=> {
    const {email} = req.body;
    
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 600000);

    await User.findOneAndUpdate({email},{otp,otpExpires},{new:true,upsert:true});
    await sendOtp(email,otp);
    return res.status(200)
    .json(new ApiResponse(200,{},'Otp sent successfully'));
})


const resetPassword = asyncHandler(async(req, res)=> {
    const {email,otp,newPassword} = req.body;
     if(!email || !otp || !newPassword) {
        throw new ApiError(400, 'All fields are required');
     }

     const user = await User.findOne({email});
     if(!user) {
        throw new ApiError(404, 'User does not exist');
     }

     if(user.otp !== otp || user.otpExpires < Date.now()) {
        throw new ApiError(400, 'Invalid or expired otp');
     }

     user.password = newPassword;
     user.otp = null;
     user.otpExpires = null;
     await user.save();

     return res.status(200)
     .json(new ApiResponse(200, {}, 'Password reset successfully'));

})


export {
    sendResetPasswordOtp,
    resetPassword
}