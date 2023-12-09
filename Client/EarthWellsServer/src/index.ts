import express, {Request, Response} from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import Posts from "./models/post"
import User from "./models/user"
import Replies from "./models/reply"
import MaterialModel from "./models/material";
import TagModel from "./models/tags";
const jwt = require('jsonwebtoken');



mongoose.model('Replies', Replies.schema);

const app = express();

app.use(cors());
app.use(express.json());



app.get('/', (req: Request, res: Response) => {
    res.send("hello");
})


interface PostParams {
  _id: string;
  post: {
    _id: string;
    // other properties if applicable
  };
}

app.post('/signup', async (req, res) => {
  try {
    // Extract username, password, firstName, and lastName from the request body
    const { username, password, firstName, lastName, location } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({
      username,
      password,
      firstName,
      lastName,
      location,
    });

    // Save the new user to the database
    const createdUser = await newUser.save();

    // Respond with the created user
    res.status(201).json(createdUser);
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, message: 'Failed to create a new user' });
  }
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

    const userInfo = { id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, userLocation: user.location };

    // Generate a JWT token
    const token = jwt.sign(userInfo, 'your_secret_key');
  
    res.json({ token, success: true, message: 'Login successful' });
  } catch (error) {
    // Handle server errors
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/users/:username', async (req, res) => {
  try {
    const username = req.params.username;

    // Find the user by username in the database
    const user = await User.findOne({ username });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Respond with the user information
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});













app.post("/posts", async (req: Request, res: Response) => {
  const { title, body, username, materials, tags } = req.body;
console.log(req.body);
  try {
    // Find the user by username to obtain their ObjectId
    const user = await User.findOne({ username });

    if (!user) {
      // Handle the case where the user with the specified username doesn't exist
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const materialsArray = Array.isArray(materials) ? materials : [];
    const tagsArray = Array.isArray(tags) ? tags : [];
  
    // Search for material IDs based on material names
    const materialIds = await Promise.all(
      materialsArray.map(async (materialName: string) => {
        const material = await MaterialModel.findOne({ name: materialName });
        return material ? material._id : null;
      })
    );
  
    // Search for tag IDs based on tag names
    const tagIds = await Promise.all(
      tagsArray.map(async (tagName: string) => {
        const tag = await TagModel.findOne({ name: tagName });
        return tag ? tag._id : null;
      })
    );

    // Create a new post with title, body, author (ObjectId), materials (Array of material IDs), and tags (Array of tag IDs)
    const newPost = new Posts({
      title,
      body,
      author: user._id,
      materials: materialIds.filter(Boolean), // Remove any null values
      tags: tagIds.filter(Boolean), // Remove any null values
    });


    const createdPost = await newPost.save();
    res.json(createdPost);
  } catch (error) {
    // Handle any error that may occur during post creation
    console.error('Error creating a new post:', error);
    res.status(500).json({ success: false, message: 'Failed to create a new post' });
  }
});

app.get("/posts", async (req: Request, res: Response) => {
  try {
    const posts = await Posts.find()
      .populate('materials') // Populate the 'materials' field
      .populate('tags'); // Populate the 'tags' field

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/posts/:_id', async (req: Request<PostParams>, res: Response) => {
  try {
    const postId = req.params._id;
    const post = await Posts.findById(postId)
      .populate({
        path: 'replies',
        populate: {
          path: 'author',
          select: 'firstName', 
        },
      })
      .populate('materials') // Populate the 'replies' and 'materials' fields
      .populate('tags'); // Populate the 'replies', 'materials', and 'tags' fields
   if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch post details' });
  }
});

app.post("/reply/:postId/", async (req: Request, res: Response) => {
  const postId = req.params.postId;

  // Find the post by its ID
  const post = await Posts.findById(postId);

  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  // Assuming the user's ID is included in the request (e.g., in the headers or body)
  const username = req.body.username; // Replace 'userId' with the actual field name containing the user's ID in the request

  if (!username) {
    return res.status(400).json({ success: false, message: 'User ID not provided' });
  }
  
  // Find the user by their ID
  const user = await User.findOne({ username });
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Create a new reply
  const newReply = new Replies({
    content: req.body.content,
    author: user,
    post: post,
  });

  try {
    // Save the reply to the database
    const createdReply = await newReply.save();

    // Add the created reply's ID to the 'replies' array in the associated post
    post.replies.push(createdReply._id);

    // Save the updated post with the new reply reference
    await post.save();

    res.json(createdReply);
  } catch (error) {
    console.error("Error creating a new reply:", error);
    res.status(500).json({ success: false, message: "Failed to create a new reply" });
  }
});
// Assuming you have a route to like a post

app.post('/posts/:postId/like', async (req, res) => {
  const postId = req.params.postId;
  const username = req.body.username;

  try {
    // Find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Find the post by its ID
    const post = await Posts.findById(postId)
    .populate({
      path: 'replies',
      populate: {
        path: 'author',
        select: 'firstName', 
      },
    })
    .populate('materials') // Populate the 'replies' and 'materials' fields
    .populate('tags'); 

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Check if the user has already liked the post
    const likedIndex = post.likes.indexOf(user._id);
    if (likedIndex !== -1) {
      // If already liked, remove the like
      post.likes.splice(likedIndex, 1);
    } else {
      // If not liked, add the like
      // Check if the user has already disliked the post; if yes, remove from dislikes array
      const dislikedIndex = post.dislikes.indexOf(user._id);
      if (dislikedIndex !== -1) {
        post.dislikes.splice(dislikedIndex, 1);
      }

      // Add user ObjectId to the likes array
      post.likes.push(user._id);
    }

    // Save the updated post
    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ success: false, message: 'Failed to like the post' });
  }
});

// app.post('/posts/:postId/dislike', ...
app.post('/posts/:postId/dislike', async (req, res) => {
  const postId = req.params.postId;
  const username = req.body.username;

  try {
    // Find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Find the post by its ID
    const post = await Posts.findById(postId)
    .populate({
      path: 'replies',
      populate: {
        path: 'author',
        select: 'firstName', 
      },
    })
    .populate('materials') // Populate the 'replies' and 'materials' fields
    .populate('tags').populate('likes').populate('dislikes'); 

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Check if the user has already disliked the post
    const dislikedIndex = post.dislikes.indexOf(user._id);
    if (dislikedIndex !== -1) {
      // If already disliked, remove the dislike
      post.dislikes.splice(dislikedIndex, 1);
    } else {
      // If not disliked, add the dislike
      // Check if the user has already liked the post; if yes, remove from likes array
      const likedIndex = post.likes.indexOf(user._id);
      if (likedIndex !== -1) {
        post.likes.splice(likedIndex, 1);
      }

      // Add user ObjectId to the dislikes array
      post.dislikes.push(user._id);
    }

    // Save the updated post
    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    console.error('Error disliking post:', error);
    res.status(500).json({ success: false, message: 'Failed to dislike the post' });
  }
});



app.post("/materials", async (req: Request, res: Response) => {
  const { name, locations, description, alternatives } = req.body;

  // Create a new material with name, locations, description, and alternative
  const newMaterial = new MaterialModel({
    name,
    locations,
    description,
    alternatives,
  });

  try {
    const createdMaterial = await newMaterial.save();
    res.json(createdMaterial);
  } catch (error) {
    // Handle any error that may occur during material creation
    console.error("Error creating a new material:", error);
    res.status(500).json({ success: false, message: "Failed to create a new material" });
  }
});

app.get('/materials', async (req: Request, res: Response) => {
  try {
    // Retrieve all materials from the database and populate the alternatives field
    const materials = await MaterialModel.find().populate('alternatives');

    // Send the list of materials as the response
    res.json(materials);
  } catch (error) {
    console.error('Error retrieving materials:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve materials' });
  }
});

interface MaterialParams {
  _id: string; // Adjust the type according to the actual type of _id
}
app.get('/materials/:_id', async (req: Request<MaterialParams>, res: Response) => {
  try {
    const materialId = req.params._id;
    
    // Retrieve the material by its ID
    const material = await MaterialModel.findById(materialId).populate('alternatives');

    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }

    // Send the material as the response
    res.json(material);
  } catch (error) {
    console.error('Error retrieving material:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve material' });
  }
});











app.post('/tags', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const newTag = new TagModel({
      name,
      description,
    });

    const createdTag = await newTag.save();
    res.json(createdTag);
  } catch (error) {
    console.error('Error creating a new tag:', error);
    res.status(500).json({ success: false, message: 'Failed to create a new tag' });
  }
});


app.get('/tags', async (req: Request, res: Response) => {
  try {
    const tags = await TagModel.find();
    res.json(tags);
  } catch (error) {
    console.error('Error retrieving tags:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve tags' });
  }
});

app.get('/tags/:tagId', async (req: Request, res: Response) => {
  try {
    const tagId = req.params.tagId;
    
    const tag = await TagModel.findById(tagId);

    if (!tag) {
      return res.status(404).json({ success: false, message: 'Tag not found' });
    }

    res.json(tag);
  } catch (error) {
    console.error('Error fetching tag details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch tag details' });
  }
});

app.get('/posts/by-filter', async (req: Request, res: Response) => {
  try {
    let filter: { [key: string]: string } = {};

    if (req.query.material) {
      filter = { materials: req.query.material as string };
    } else if (req.query.tag) {
      filter = { tags: req.query.tag as string };
    }

    const posts = await Posts.find(filter)
      .populate({
        path: 'replies',
        populate: {
          path: 'author',
          select: 'firstName', 
        },
      })
      .populate('materials')
      .populate('tags');

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts by filter:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch posts by filter' });
  }
});













    
    





mongoose.connect('mongodb+srv://wellsearth:tJtj4QvfZ4WwM4IU@clusterearthwells.y5bzjst.mongodb.net/?retryWrites=true&w=majority'
  ).then(() => {
    console.log('listening on port 5000');
    app.listen(5000); 
}).catch((err) => {
    console.error('Error connecting to the database:', err);
});


