import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cookieParser from 'cookie-parser';

import {connectDB} from './db/index.js';

// routers
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';
import likeRouter from './routes/like.route.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieParser())


// Use cloudinary
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  



app.get('/',(req, res)=> {
    res.send('Hello World');
    
})



// routes
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);




connectDB()
.then(()=> {
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`Server is running on port: ${process.env.PORT}`);
    })
})
.catch((err)=> {
    console.log('MongoDB connection failed', err);
})

