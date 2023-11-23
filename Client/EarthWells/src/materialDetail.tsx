// MaterialDetail.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './materialdetail.css';

interface Material {
  _id: string;
  name: string;
  locations: string[];
  description: string;
}

const MaterialDetail: React.FC = () => {
  const { materialId } = useParams<{ materialId: string }>();
  const [material, setMaterial] = useState<Material | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/materials/${materialId}`)
      .then((response) => response.json())
      .then((data) => setMaterial(data))
      .catch((error) => console.error("Error fetching material details:", error));
  }, [materialId]);

  if (!material) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Container">
<div className="material-info">
  <h2 className="material-name">{material.name}</h2>
  <p className="material-description">{material.description}</p>
  <ul className="location-list">
    {material.locations.map((location) => (
      <li key={location} className="location-item">{location}</li>
    ))}
  </ul>
</div>
</div>
  );
};

export default MaterialDetail;
