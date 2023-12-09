// App.tsx
import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { TPost } from "./api/getPosts";
import PostForm from "./postForm";
import Materials from "./materialList";
import Header from "./Header";
interface TokenType {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    userLocation: string;
    // Add other properties if needed
  }
  
  interface HomeProps {
    token: TokenType;
    handleLogout: () => void;
  }
  
  const Home: React.FC<HomeProps> = ({ token }) => {

  const [posts, setPosts] = useState<TPost[]>([]);
  const [isPopUpOpen, setPopUpOpen] = useState(false);
const tokeuun = token;
  const handleCreatePost = (title: string, body: string, username: string, materials: string[], tags: string[]) => {
    // Make a POST request to create a new post
    fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, username, materials, tags }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([...posts, data]);
        setPopUpOpen(false); // Close the pop-up after creating a post
      })
      .catch((error) => console.error("Error creating a new post:", error));
  };

  useEffect(() => {
    // Fetch the list of posts from your Express API
    fetch("http://localhost:5000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main-container">
        <section className="post-form">
          <button className="createbutton"  onClick={() => setPopUpOpen(true)}>Create a New Post</button>
          {isPopUpOpen && (
            <div className="pop-up">
              <PostForm onSubmit={handleCreatePost} token={token}/>
              <button className="cancelbutton" onClick={() => setPopUpOpen(false)}>Cancel</button>
            </div>
          )}
        </section>
        <section className="side-by-side-container">
        <section className="post-list">
          <h2>Recent Posts</h2>
          <div className="post-grid">
            {posts.map((post) => (
              <div key={post._id} className="post-item">
                <h3>
                  <Link to={`/posts/${post._id}?token=${encodeURIComponent(JSON.stringify(token))}`}>{post.title}</Link>
                </h3>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="materials-list">
  <Materials token={token} />
</section>
        </section>
      </main>
    </div>
  );
}

export default Home;
