import express from 'express';
const router = express.Router();

import {addComment,getComment,deleteComment,updateComment} from '../controllers/comment.controller.js';
import {varifyJwt} from '../middlewares/auth.middleware.js';

router.post('/:postId', varifyJwt, addComment);
router.get('/:postId', varifyJwt, getComment);
router.delete('/:commemtId', varifyJwt, deleteComment);
router.put('/:commentId', varifyJwt,updateComment);


export default router;