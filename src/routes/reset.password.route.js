import express from 'express';
const router = express.Router();
import {varifyJwt} from '../middlewares/auth.middleware.js';
import {sendResetPasswordOtp,resetPassword} from '../controllers/reset.password.controller.js';

router.post('/send', varifyJwt,sendResetPasswordOtp);
router.post('/reset-password', varifyJwt, resetPassword);

export default router;