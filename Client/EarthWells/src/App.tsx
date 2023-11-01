import { useState } from 'react'

import './App.css'

function App() {
  const [title, setTitle] = useState("");

  function handleCreatePost(e: React.FormEvent){
    e.preventDefault();
    fetch('http://localhost:5009/posts', {method: "POST", body: JSON.stringify({title,
  }),
});
  }

  return (
    <>

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
