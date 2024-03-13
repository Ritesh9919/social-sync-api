import express from 'express';
const router = express.Router();

import {userSignup,userSignin,userLogout, logoutUserFromAllDevices} from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js';

router.post('/signup', upload.single('avatar'), userSignup);
router.post('/signin', userSignin);
router.get('/logout', userLogout);
router.get('/logoout-all-devices', logoutUserFromAllDevices);



export default router;