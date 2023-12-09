import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Posts from "./models/post";
import User from "./models/user";
import Replies from "./models/reply";
import MaterialModel from "./models/material";
import TagModel from "./models/tags";
const jwt = require("jsonwebtoken");

mongoose.model("Replies", Replies.schema);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

interface PostParams {
  _id: string;
  post: {
    _id: string;
  };
}

app.post("/signup", async (req, res) => {
  try {
    const { username, password, firstName, lastName, location } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const newUser = new User({
      username,
      password,
      firstName,
      lastName,
      location,
    });

    const createdUser = await newUser.save();

    res.status(201).json(createdUser);
  } catch (error) {
    console.error("Error during signup:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create a new user" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    if (user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const userInfo = {
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      userLocation: user.location,
    };

    // Generate a JWT token
    const token = jwt.sign(userInfo, "your_secret_key");

    res.json({ token, success: true, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/users/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/posts", async (req: Request, res: Response) => {
  const { title, body, username, materials, tags } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const materialsArray = Array.isArray(materials) ? materials : [];
    const tagsArray = Array.isArray(tags) ? tags : [];

    const materialIds = await Promise.all(
      materialsArray.map(async (materialName: string) => {
        const material = await MaterialModel.findOne({ name: materialName });
        return material ? material._id : null;
      })
    );

    const tagIds = await Promise.all(
      tagsArray.map(async (tagName: string) => {
        const tag = await TagModel.findOne({ name: tagName });
        return tag ? tag._id : null;
      })
    );

    const newPost = new Posts({
      title,
      body,
      author: user._id,
      materials: materialIds.filter(Boolean),
      tags: tagIds.filter(Boolean),
    });

    const createdPost = await newPost.save();
    res.json(createdPost);
  } catch (error) {
    console.error("Error creating a new post:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create a new post" });
  }
});

app.get("/posts", async (req: Request, res: Response) => {
  try {
    const posts = await Posts.find().populate("materials").populate("tags");

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/posts/:_id", async (req: Request<PostParams>, res: Response) => {
  try {
    const postId = req.params._id;
    const post = await Posts.findById(postId)
      .populate({
        path: "replies",
        populate: {
          path: "author",
          select: "firstName",
        },
      })
      .populate("materials")
      .populate("tags");
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post details:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch post details" });
  }
});

app.post("/reply/:postId/", async (req: Request, res: Response) => {
  const postId = req.params.postId;

  const post = await Posts.findById(postId);

  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }

  const username = req.body.username;

  if (!username) {
    return res
      .status(400)
      .json({ success: false, message: "User ID not provided" });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const newReply = new Replies({
    content: req.body.content,
    author: user,
    post: post,
  });

  try {
    const createdReply = await newReply.save();

    post.replies.push(createdReply._id);

    await post.save();

    res.json(createdReply);
  } catch (error) {
    console.error("Error creating a new reply:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create a new reply" });
  }
});

app.post("/posts/:postId/like", async (req, res) => {
  const postId = req.params.postId;
  const username = req.body.username;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const post = await Posts.findById(postId)
      .populate({
        path: "replies",
        populate: {
          path: "author",
          select: "firstName",
        },
      })
      .populate("materials")
      .populate("tags");

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const likedIndex = post.likes.indexOf(user._id);
    if (likedIndex !== -1) {
      post.likes.splice(likedIndex, 1);
    } else {
      const dislikedIndex = post.dislikes.indexOf(user._id);
      if (dislikedIndex !== -1) {
        post.dislikes.splice(dislikedIndex, 1);
      }

      post.likes.push(user._id);
    }

    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    console.error("Error liking post:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to like the post" });
  }
});

app.post("/posts/:postId/dislike", async (req, res) => {
  const postId = req.params.postId;
  const username = req.body.username;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const post = await Posts.findById(postId)
      .populate({
        path: "replies",
        populate: {
          path: "author",
          select: "firstName",
        },
      })
      .populate("materials")
      .populate("tags")
      .populate("likes")
      .populate("dislikes");

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const dislikedIndex = post.dislikes.indexOf(user._id);
    if (dislikedIndex !== -1) {
      post.dislikes.splice(dislikedIndex, 1);
    } else {
      const likedIndex = post.likes.indexOf(user._id);
      if (likedIndex !== -1) {
        post.likes.splice(likedIndex, 1);
      }

      post.dislikes.push(user._id);
    }

    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    console.error("Error disliking post:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to dislike the post" });
  }
});

app.post("/materials", async (req: Request, res: Response) => {
  const { name, locations, description, alternatives } = req.body;

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
    console.error("Error creating a new material:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create a new material" });
  }
});

app.get("/materials", async (req: Request, res: Response) => {
  try {
    const materials = await MaterialModel.find().populate("alternatives");

    res.json(materials);
  } catch (error) {
    console.error("Error retrieving materials:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve materials" });
  }
});

interface MaterialParams {
  _id: string;
}
app.get(
  "/materials/:_id",
  async (req: Request<MaterialParams>, res: Response) => {
    try {
      const materialId = req.params._id;

      const material = await MaterialModel.findById(materialId).populate(
        "alternatives"
      );

      if (!material) {
        return res
          .status(404)
          .json({ success: false, message: "Material not found" });
      }

      res.json(material);
    } catch (error) {
      console.error("Error retrieving material:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to retrieve material" });
    }
  }
);

app.post("/tags", async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const newTag = new TagModel({
      name,
      description,
    });

    const createdTag = await newTag.save();
    res.json(createdTag);
  } catch (error) {
    console.error("Error creating a new tag:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create a new tag" });
  }
});

app.get("/tags", async (req: Request, res: Response) => {
  try {
    const tags = await TagModel.find();
    res.json(tags);
  } catch (error) {
    console.error("Error retrieving tags:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve tags" });
  }
});

app.get("/tags/:tagId", async (req: Request, res: Response) => {
  try {
    const tagId = req.params.tagId;

    const tag = await TagModel.findById(tagId);

    if (!tag) {
      return res.status(404).json({ success: false, message: "Tag not found" });
    }

    res.json(tag);
  } catch (error) {
    console.error("Error fetching tag details:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch tag details" });
  }
});

app.get("/posts/by-filter", async (req: Request, res: Response) => {
  try {
    let filter: { [key: string]: string } = {};

    if (req.query.material) {
      filter = { materials: req.query.material as string };
    } else if (req.query.tag) {
      filter = { tags: req.query.tag as string };
    }

    const posts = await Posts.find(filter)
      .populate({
        path: "replies",
        populate: {
          path: "author",
          select: "firstName",
        },
      })
      .populate("materials")
      .populate("tags");

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts by filter:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch posts by filter" });
  }
});

mongoose
  .connect(
    "mongodb+srv://wellsearth:1HzfccQU98ACXqna@clusterearthwells.y5bzjst.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("listening on port 5000");
    app.listen(5000);
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
