import express from 'express';
const router = express.Router();

router.post('/signup');
router.post('/signin');
router.get('/logout');



export default router;