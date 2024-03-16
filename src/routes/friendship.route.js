import express from 'express';
const router = express.Router();

import {varifyJwt} from '../middlewares/auth.middleware.js';
import {
   getUserFriends,
   getPendingFriendRequest,
   toggleFriendship,
   acceptOrRejectFriendRequest
}
from '../controllers/friendship.controller.js';

router.get('/get-friends/:friendId', varifyJwt, getUserFriends);
router.get('/get-pending-requests', varifyJwt, getPendingFriendRequest);
router.post('/toggle-friendship/:friendId', varifyJwt, toggleFriendship);
router.post('/response-to-request', varifyJwt, acceptOrRejectFriendRequest);


export default router;