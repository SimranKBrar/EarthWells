import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import './materialpage.css';

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

const MaterialsList: React.FC<MaterialsProps> = ({ token }) => {
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
    <div>  <Header />
      <div className="MaterialListconatinerpage">
        <div className="MaterialListconatiner2page">
          <h2 className="MaterialListheaderpage" >Materials</h2>
          <div className="MaterialListconatinerinnerpage">
            {materials.map((material) => (
              <div key={material._id} className="material-itempage">
                <Link to={`/materials/${material._id}?token=${encodeURIComponent(JSON.stringify(token))}`}>
                  <strong className="MaterialListitemnamepage" >{material.name}</strong>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialsList;
