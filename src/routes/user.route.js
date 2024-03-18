import express from 'express';
const router = express.Router();

import {
    userSignup,
    userSignin,
    userLogout, 
    logoutUserFromAllDevices,
    getUser,
    getAllUsers,
    updateUserDeatils
    
} 
from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js';
import {varifyJwt} from '../middlewares/auth.middleware.js';

router.post('/signup', upload.single('avatar'), userSignup);
router.post('/signin', userSignin);
router.get('/logout', varifyJwt,userLogout);
router.get('/logoout-all-devices', logoutUserFromAllDevices);

router.get('/get-details/:userId',varifyJwt,getUser);
router.get('/get-all-details', varifyJwt, getAllUsers);
router.put('/update-details/:userId', varifyJwt, upload.single('avatar'),updateUserDeatils);





export default router;