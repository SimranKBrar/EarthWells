import express, {Request, Response} from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import Posts from "./models/post"
import User from "./models/user"


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

app.post("/posts/:postId/replies", async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const Post = Posts.findById(postId);

  const reply = req.body;


  const newPost = new Posts({
      title : req.body.title,
  });
  const createdPost = await newPost.save();
  res.json(createdPost);
    });




    app.post('/signup', async (req, res) => {
          const newUser = new User({
        username: req.body.username,
        password: req.body.password,
    });
    const createdUser = await newUser.save();
    res.json(createdUser);
    });
    
    

    
    app.post('/login', async (req, res) => {
      const { username, password } = req.body;
    
      try {
        // Find the user by username in the database
        const user = await User.findOne({ username });
    
        // If the user doesn't exist, return an error
        if (!user) {
          return res.status(401).json({ success: false, message: 'User not found' });
        }
        if (user.password !== password) {
          // Passwords do not match, return an error
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    
        res.json({ success: true, message: 'Login successful' });
      } catch (error) {
        // Handle server errors
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
      }
    });



mongoose.connect('mongodb+srv://wellsearth:J3peaSVz52XRAqmv@clusterearthwells.y5bzjst.mongodb.net/?retryWrites=true&w=majority'
  ).then(() => {
    console.log('listening on port 5000');
    app.listen(5000); 
}).catch((err) => {
    console.error('Error connecting to the database:', err);
});


