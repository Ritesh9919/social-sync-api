import express from 'express';
const router = express.Router();
import {togglePostLike,toggleCommentLike,getCommentLike,getPostLike} from '../controllers/like.controller.js'
import {varifyJwt} from '../middlewares/auth.middleware.js';

router.post('/post/:postId', varifyJwt, togglePostLike);
router.post('/comment/:commentId', varifyJwt, toggleCommentLike);
router.get('/post/:postId', varifyJwt, getPostLike);
router.get('/comment/:commentId', varifyJwt, getCommentLike);

export default router;