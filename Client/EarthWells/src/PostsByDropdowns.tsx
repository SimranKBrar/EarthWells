import React, { useState, useEffect } from 'react';
import "./css/Sort.css"
import Header from './Header';
import { Link } from 'react-router-dom';

interface Material {
  name: string;
}

interface Tag {
  name: string;
}

interface Post {
  _id: string;
  title: string;
  body: string;
  materials: Material[];
  tags: Tag[];
}

const PostFilterPage: React.FC = (token) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, materialsResponse, tagsResponse] = await Promise.all([
          fetch('http://localhost:5000/posts'),
          fetch('http://localhost:5000/materials'),
          fetch('http://localhost:5000/tags')
        ]);

        if (!postsResponse.ok || !materialsResponse.ok || !tagsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [postsData, materialsData, tagsData] = await Promise.all([
          postsResponse.json(),
          materialsResponse.json(),
          tagsResponse.json()
        ]);

        setPosts(postsData);
        setMaterials(materialsData);
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [selectedMaterial, selectedTag]);

  const handleFilter = () => {
    console.log('Filtering posts...');
    console.log('Selected Material:', selectedMaterial);
    console.log('Selected Tag:', selectedTag);

    const newFilteredPosts = posts.filter(post => {
      const materialMatch = selectedMaterial
        ? post.materials.some(material => material.name === selectedMaterial)
        : true;

      const tagMatch = selectedTag ? post.tags.some(tag => tag.name === selectedTag) : true;

      console.log(`Post "${post.title}" - Material Match: ${materialMatch}, Tag Match: ${tagMatch}`);

      return materialMatch && tagMatch;
    });

    console.log('Filtered Posts:', newFilteredPosts);

    setFilteredPosts(newFilteredPosts);
  };
  useEffect(() => {
    if (filteredPosts.length === 0) {
      setFilteredPosts(posts);
    }
  }, [filteredPosts, posts]);

  const handleRemoveFilter = () => {
    setSelectedMaterial('');
    setSelectedTag('');
  };

  return (
    <div><Header />
      <div className="filter-posts-container">
        <div className="filter-posts-content">
          <h1 className="filter-posts-title">Filter Posts</h1>
          <div className="filter-posts-select">
            <label className="filter-posts-label">Material:</label>
            <select
              className="filter-posts-dropdown"
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
            >
              <option value="">All Materials</option>
              {materials.map((material, index) => (
                <option key={index} value={material.name}>
                  {material.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-posts-select">
            <label className="filter-posts-label">Tag:</label>
            <select
              className="filter-posts-dropdown"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">All Tags</option>
              {tags.map((tag, index) => (
                <option key={index} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          <button className="filter-posts-button" onClick={handleFilter}>
            Filter
          </button>
          <button className="filter-posts-button" onClick={handleRemoveFilter}>
            Remove Filter
          </button>
          <div className="filter-posts-results">
            <h2 className="filter-posts-subtitle">Filtered Posts</h2>
            {filteredPosts.length === 0 ? (
              <p>No posts found.</p>
            ) : (
              <ul className="filter-posts-list">
                {filteredPosts.map((post, index) => (
                  <li key={index}>            <h3>
                    <Link to={`/posts/${post._id}?token=${encodeURIComponent(JSON.stringify(token))}`}>{post.title}</Link>
                  </h3></li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFilterPage;
