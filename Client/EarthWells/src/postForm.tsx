import React, { useState, useEffect } from 'react';
import { fetchTags, fetchMaterials } from './fetchOptions';
import "./css/PostForm.css"

interface TokenType {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  userLocation: string;
}

interface PostSubmissionFormProps {
  onSubmit: (title: string, body: string, username: string, tags: string[], materials: string[]) => void;
  token: TokenType;
}

const PostSubmissionForm: React.FC<PostSubmissionFormProps> = ({ onSubmit, token }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [username, setUsername] = useState('');
  const [tags, setTags] = useState<{ _id: string; name: string }[]>([]);
  const [materials, setMaterials] = useState<{ _id: string; name: string }[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetchMaterials().then((data) => setMaterials(data));
    fetchTags().then((data) => setTags(data));
  }, []);

  useEffect(() => {
    console.log('Title:', title);
    console.log('Body:', body);
    console.log('Username:', username);
    console.log('Tags:', tags);
    console.log('Materials:', selectedMaterials);
  }, [title, body, token.username, tags, selectedMaterials]);

  const handleMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedMaterials((prevSelected) => {
      if (e.target.checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((id) => id !== value);
      }
    });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedTags((prevSelected) => {
      if (e.target.checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((id) => id !== value);
      }
    });
  };

  const selectedMaterialNames = selectedMaterials.map(materialId => {
    const selectedMaterial = materials.find(material => material._id === materialId);
    return selectedMaterial ? selectedMaterial.name : '';
  });

  const selectedTagNames = selectedTags.map(tagId => {
    const selectedTag = tags.find(tag => tag._id === tagId);
    return selectedTag ? selectedTag.name : '';
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Title:', title);
    console.log('Body:', body);
    console.log('Username:', username);
    console.log('Tags:', tags);
    console.log('MaterialsNames:', selectedMaterialNames);

    onSubmit(title, body, token.username, selectedMaterialNames, selectedTagNames);

    setTitle('');
    setBody('');
    setUsername('');
    setTags([]);
    setSelectedMaterials([]);
  };
  return (
    <div className='postformconatiner' >
      <div className='postformbox'>
        <form className='postformform' onSubmit={handleSubmit}>
          <div className='postformtitlebox'>
            <label className='postformtitle' htmlFor="post-title">Title</label>
            <input className='postformtitleinput'
              type="text"
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='postformbodybox'>
            <label className='postformbodytitle' htmlFor="post-body">Body</label>
            <textarea className='postformbodyinput'
              id="post-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div className='postformmaterialsbox'>
            <label className='postformmaterialstitle'>
              Materials:
              {materials.map((material) => (
                <div className='postformmaterialitem' key={material._id}>
                  <input className='postformmaterialcheck'
                    type="checkbox"
                    name="materials"
                    value={material._id}
                    checked={selectedMaterials.includes(material._id)}
                    onChange={(e) => handleMaterialChange(e)}
                  />
                  <span className='postformmaterialname'>{material.name}</span>
                </div>
              ))}
            </label>
          </div>
          <div className='postformtagbox'>
            <label className='postformtaglabel'>
              Tags:
              {tags.map((tag) => (
                <div className='postformtagitem' key={tag._id}>
                  <input className='postformtagcheck'
                    type="checkbox"
                    name="tags"
                    value={tag._id}
                    checked={selectedTags.includes(tag._id)}
                    onChange={(e) => handleTagChange(e)}
                  />
                  <span className='postformtagname'>{tag.name}</span>
                </div>
              ))}
            </label>
          </div >
          <button className='postformsubmitbutton' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PostSubmissionForm;
