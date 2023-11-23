// Materials.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import './maertiallist.css';

interface Material {
  _id: string;
  name: string;
  locations: string[];
  description: string;
}

const Materials: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/materials")
      .then((response) => response.json())
      .then((data) => setMaterials(data))
      .catch((error) => console.error("Error fetching materials:", error));
  }, []);

  return (
    <div>
  
    <div>
      <h2>Materials</h2>
      <div >
        {materials.map((material) => (
          <div key={material._id} className="material-item">
            <Link to={`/materials/${material._id}`}>
              <strong>{material.name}</strong>
            </Link>
          
          </div>
        ))}
     </div>
    </div>
    </div>
  );
};

export default Materials;
