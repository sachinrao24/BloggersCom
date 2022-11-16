import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes.js';
import router from './routes/user-routes.js';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter)

mongoose.connect(
    'connect to mongodb'
).then(()=>app.listen(5000)).then(()=>console.log("Connected to database and listening to port 5000")).catch((err)=>console.log(err));

