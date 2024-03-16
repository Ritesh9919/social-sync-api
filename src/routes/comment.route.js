import express from 'express';
const router = express.Router();

import {varifyJwt} from '../middlewares/auth.middleware.js';

router.post('/:postId', varifyJwt);
router.get('/:postId', varifyJwt);
router.delete('/:commemtId', varifyJwt);
router.put('/:commentId', varifyJwt);


export default router;