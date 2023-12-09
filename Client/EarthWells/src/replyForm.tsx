import React, { useState } from 'react';
import './css/ReplyForm.css';

interface TokenType {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  userLocation: string;
}

interface ReplyFormProps {
  onSubmit: (content: string, username: string) => void;
  token: TokenType;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmit, token }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSubmit(content, token.username);
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
