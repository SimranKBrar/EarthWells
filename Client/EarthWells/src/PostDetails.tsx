// PostDetails.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReplyForm from './replyForm';
import Header from './Header';
import './PostDetail.css';
// Define types for Material, Tag, and Reply
interface Material {
  _id: string;
  name: string;
  // other properties
}

interface Tag {
  _id: string;
  name: string;
  // other properties
}

interface Reply {
  _id: string;
  content: string;
  author: {
    _id: string;
   firstName: string; // Include other properties from the User model if needed
  };
  post: {
    _id: string;
    // Include other properties from the Post model if needed
  };
  createdAt: Date;
  // Include other properties if needed
}

interface Post {
  _id: string;
  title: string;
  body: string;
  materials: Material[];
  tags: Tag[];
  replies: Reply[];
}

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    // Fetch post details using postId
    fetch(`http://localhost:5000/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error('Error fetching post details:', error));
  }, [postId]);

  const handleReplySubmit = (content:string, username:string) => {
    // Perform the API call to submit the reply
    fetch(`http://localhost:5000/reply/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, username }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the post state to include the new reply
        setPost((prevPost) => ({
          ...prevPost!,
          replies: [...prevPost!.replies, data],
        }));
      })
      .catch((error) => console.error('Error submitting reply:', error));
  };
  if (!post) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any loading indicator
  }

  return (
   <div> <Header />
   <div className='Container'>
    <div className='postContainer'>
    <div className='posttwoContainer'>
    <h2 className='posttitle'>{post.title}</h2>
    <div className='postmaterials'>
  <div className='materialList'>
    {post.materials.map((material) => (
      <Link to={`/materials/${material._id}`} key={material._id}>
        <div className='materialItem'>{material.name}</div>
      </Link>
    ))}
  </div>
      
      <p className='postbody'>{post.body}</p>

     
</div>

      <div className='postItems'>
        <h3>Tags</h3>
        <div className='taglist'>
          {post.tags.map((tag) => (
            <div className='tagItem' key={tag._id}>{tag.name}</div>
          ))}
        </div>
      </div>
      </div>
      <div className='replyformcontainer'><ReplyForm onSubmit={handleReplySubmit} /> </div>
      
      <div className='postreplies'>
  <h3>Replies</h3>
  <div className='replylist'>
    {post.replies.map((reply) => (
      <div className='replyitem' key={reply._id}>
   
        <div className='reply-content'>{reply.content}</div>
        <div className='reply-user'>
          <span className='user-label'>User:</span>
          <span className='user-name'>{reply.author.firstName}</span>
        </div>
      </div>
    ))}
  </div>
</div>
    
    </div>
    </div>
    </div>
    
  );
};

export default PostDetails;
