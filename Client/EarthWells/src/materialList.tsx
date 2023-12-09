import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './maertiallist.css';

interface Material {
  _id: string;
  name: string;
  locations: string[];
  description: string;
}
interface TokenType {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  userLocation: string;
}

interface MaterialsProps {
  token: TokenType;
}

const Materials: React.FC<MaterialsProps> = ({ token }) => {
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/materials", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setMaterials(data))
      .catch((error) => console.error("Error fetching materials:", error));
  }, [token]);

  return (
    <div className="MaterialListconatiner">
      <div className="MaterialListconatiner2">
        <h2 className="MaterialListheader" >Materials</h2>
        <div className="MaterialListconatinerinner">
          {materials.map((material) => (
            <div key={material._id} className="material-item">
              <Link to={`/materials/${material._id}?token=${encodeURIComponent(JSON.stringify(token))}`}>
                <strong className="MaterialListitemname" >{material.name}</strong>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Materials;
