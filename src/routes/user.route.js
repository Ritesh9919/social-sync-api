import express from 'express';
const router = express.Router();

import {userSignup,userSignin,userLogout} from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js';

router.post('/signup', upload.single('avatar'), userSignup);
router.post('/signin', userSignin);
router.get('/logout', userLogout);



export default router;