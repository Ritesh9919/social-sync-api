import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';
import {ApiError} from '../utils/index.js';


export const varifyJwt = async(req, res, next)=> {
    const token = req.cookies?.accessToken || req.header['Authorization']?.replace("Bearer ", "");

    if(!token) {
        throw new ApiError(401, 'Unauthorized request');
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken.userId);
        if(!user) {
            throw new ApiError(401, 'Invalid accessToken');
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, 'Invalid accessToken');
    }
}