import { useEffect, useState } from 'react'

import './App.css'

type TPost = {
  title: string;
  _id: string;
};

function App() {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [title, setTitle] = useState("");

  async function handleCreatePost(e: React.FormEvent){
    e.preventDefault();
   await  fetch('http://localhost:5000/posts', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ title }), 
    });
    setTitle("");
  }

  useEffect(() => {
    async function fetchPosts() {
     const response = await  fetch('http://localhost:5000/posts');
     const newPosts = await response.json();
     setPosts(newPosts);
    }
    fetchPosts();

  },[]);

  return (
    <>
<div className='posts'>
{

  posts.map((post) =>(

    <li key = {post._id}>{post.title}</li>
  ))
}
</div>
   <form onSubmit={handleCreatePost}>
    <label htmlFor="post-title">Post title</label>
    <input id="post-title" value={title}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
   {
    
    setTitle(e.target.value);
   }
    }
    />
    <button>Create Post</button>
   </form>
    </>
  )
}

export default App
