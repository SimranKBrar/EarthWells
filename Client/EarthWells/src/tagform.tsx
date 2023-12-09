import React, { useState } from 'react';
import Header from "./Header";
import "./css/TagForm.css"

const TagForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to create a new tag');
      }

      const createdTag = await response.json();

    } catch (error) {
      console.error('Error creating a new tag:', error);
    }
  };

  return (
    <div > <Header />
      <div className='tagformcont'>
        <form className='tagform' onSubmit={handleSubmit}>
          <h1>Add a Tag</h1>
          <div className='tagnamecont'>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
          </div>
          <br />
          <div className='tagdeccont'>
            <label>
              Description:
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
          </div>
          <br />
          <button className='tagbuttoncont' type="submit">Create Tag</button>
        </form>
      </div>
    </div>
  );
};

export default TagForm;
