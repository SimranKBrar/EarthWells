import express, {Request, Response} from "express";
import mongoose from 'mongoose';

import Posts from "./models/post"


const app = express();

app.use(express.json);

app.get('/', (req: Request, res: Response) => {
    res.send("hello");
})



app.post("/posts", async (req: Request, res: Response) => {
const newPost = new Posts({
    title : "my new pot",
});
const createdPost = await newPost.save();
res.json(createdPost);
  });
  

mongoose.connect('mongodb+srv://wellsearth:8AZ9YDtWNa2iwm8P@clusterearthwells.y5bzjst.mongodb.net/?retryWrites=true&w=majority'
  ).then(() => {
    console.log('listening on port 5000');
    app.listen(5000); 
}).catch((err) => {
    console.error('Error connecting to the database:', err);
});


