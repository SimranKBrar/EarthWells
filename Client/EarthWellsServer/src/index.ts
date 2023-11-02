import express, {Request, Response} from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import Posts from "./models/post"


const app = express();

app.use(cors());
app.use(express.json());



app.get('/', (req: Request, res: Response) => {
    res.send("hello");
})



app.post("/posts", async (req: Request, res: Response) => {
const newPost = new Posts({
    title : req.body.title,
});
const createdPost = await newPost.save();
res.json(createdPost);
  });
  
app.get("/posts", async (req: Request, res: Response) => {
const posts = await Posts.find();
console.log(posts);
res.json(posts);
    });

app.delete('/posts/:postId', async (req: Request, res: Response) => {
  const postId = req.params.deckId;
  await Posts.findByIdAndDelete(postId);
res.json(Posts);

});
mongoose.connect('mongodb+srv://wellsearth:J3peaSVz52XRAqmv@clusterearthwells.y5bzjst.mongodb.net/?retryWrites=true&w=majority'
  ).then(() => {
    console.log('listening on port 5000');
    app.listen(5000); 
}).catch((err) => {
    console.error('Error connecting to the database:', err);
});


