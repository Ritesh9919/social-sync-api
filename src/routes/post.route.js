import express from 'express';
const router = express.Router()

import {varifyJwt} from '../middlewares/auth.middleware.js';
import {upload} from '../middlewares/multer.middleware.js';
import {
     createPost,
     getPostByUser,
     getAllPostByUser,
     deletePost,
     updatePost
      } 
from '../controllers/post.controller.js';

router.post('/', varifyJwt, upload.single('imageUrl'), createPost);
router.get('/', varifyJwt, getAllPostByUser);
router.get('/:postId', varifyJwt, getPostByUser);
router.delete('/:postId', varifyJwt, deletePost);
router.put('/:postId', varifyJwt, updatePost);

export default router;

