import React, { useState, useEffect } from 'react';
import { fetchMaterials, fetchTags } from './fetchOptions';

interface PostSubmissionFormProps {
    onSubmit: (title: string, body: string, username: string, materials: string[], tags: string[]) => void;
}

const PostSubmissionForm: React.FC<PostSubmissionFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [username, setUsername] = useState('');
  const [materials, setMaterials] = useState<{ id: string; name: string }[]>([]); // Updated state type
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]); // Updated state type
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    console.log('New Username:', newUsername);
    setUsername(newUsername);
  };
  // You might want to fetch materials and tags from the server and update the state accordingly
  useEffect(() => {
    // Fetch materials and tags from the server and update state
    // Example:
    fetchMaterials().then(data => setMaterials(data));
    fetchTags().then(data => setTags(data));
  }, []);

  useEffect(() => {
    console.log('Title2:', title);
    console.log('Body2:', body);
    console.log('Username:2', username);
    console.log('Materials:2', materials);
    console.log('Tags:2', tags);
  }, [title, body, username, materials, tags]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Title:', title);
    console.log('Body:', body);
    console.log('Username:', username);
    console.log('Materials:', materials);
    console.log('Tags:', tags);// Pass the input values to the parent component's onSubmit function
    onSubmit(title, body, username, materials.map(mat => mat.id), tags.map(tag => tag.id));
    console.log('Title:', title);
    console.log('Body:', body);
    console.log('Username:', username);
    console.log('Materials:', materials);
    console.log('Tags:', tags);
    // Optionally, you can reset the form fields after submission
    setTitle('');
    setBody('');
    setUsername('');
    setMaterials([]);
    setTags([]);
  };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="post-title">Title</label>
            <input
                type="text"
                id="post-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <label htmlFor="post-body">Body</label>
            <textarea
                id="post-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
            />

            <label htmlFor="post-username">Username</label>
            <input
                type="text"
                id="post-username"
                value={username}
                onChange={handleUsernameChange}
                required
            />

<label htmlFor="post-materials">Materials</label>
      <select
        multiple
        id="post-materials"
        value={materials.map(mat => mat.name)} 
        onChange={(e) => setMaterials(Array.from(e.target.selectedOptions, (option) => ({ id: option.value, name: option.label })))}
      >
        {/* Map over available materials and create options */}
        {materials.map((material) => (
          <option key={material.id} value={material.name}>
            {material.name}
          </option>
        ))}
      </select>

      <label htmlFor="post-tags">Tags</label>
      <select
        multiple
        id="post-tags"
        value={tags.map(tag => tag.name)} 
        onChange={(e) => setTags(Array.from(e.target.selectedOptions, (option) => ({ id: option.value, name: option.label })))}
      >
        {/* Map over available tags and create options */}
        {tags.map((tag) => (
          <option key={tag.id} value={tag.name}>
            {tag.name}
          </option>
        ))}
      </select>

      <button type="submit">Submit</button>
    </form>
    );
};

export default PostSubmissionForm;