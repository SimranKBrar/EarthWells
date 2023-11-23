// ReplyForm.js
import React, { useState } from 'react';
import './replyForm.css';

interface ReplyFormProps {
  onSubmit: (content: string, username: string) => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSubmit(content, 'sim');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className='formReply'>
      <label htmlFor="reply-content">Your Reply: </label>
      <textarea
        id="reply-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
       <input type='hidden' value='sim' name='username' />
      <button type="submit">Submit Reply</button>
    </form>
  );
};

export default ReplyForm;
