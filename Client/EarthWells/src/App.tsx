import { useEffect, useState } from "react";

import "./App.css";
import { Link } from "react-router-dom";
import { TPost, getPosts } from "./api/getPosts";
import { createPosts } from "./api/createPosts";


function App() {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [title, setTitle] = useState("");

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();

    const post = await createPosts(title);
    setPosts([...posts, post]);

    setTitle("");
  }

  useEffect(() => {
    async function fetchPosts() {
      const newPosts = await getPosts();
      setPosts(newPosts);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <div className="posts">
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={"posts/${post._id}"}>{post.title}</Link>
          </li>
        ))}
      </div>
      <form onSubmit={handleCreatePost}>
        <label htmlFor="post-title">Post title</label>
        <input
          id="post-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create Post</button>
      </form>
    </>
  );
}

export default App;
