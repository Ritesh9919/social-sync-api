import express from 'express';
const router = express.Router();

import {
    userSignup,
    userSignin,
    userLogout, 
    logoutUserFromAllDevices,
    getUser
} 
from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js';
import {varifyJwt} from '../middlewares/auth.middleware.js';

router.post('/signup', upload.single('avatar'), userSignup);
router.post('/signin', userSignin);
router.get('/logout', varifyJwt,userLogout);
router.get('/logoout-all-devices', logoutUserFromAllDevices);

router.get('/get-details/:userId',varifyJwt,getUser);



export default router;