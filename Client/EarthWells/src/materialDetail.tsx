import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import './css/MaterialDetail.css';
import Header from "./Header";

interface Material {
  _id: string;
  name: string;
  locations: string[];
  description: string;
  alternatives: Material[];
}

const MaterialDetail: React.FC = () => {
  const { materialId } = useParams<{ materialId: string }>();
  const [material, setMaterial] = useState<Material | null>(null);
  const location = useLocation();

  const tokenParam = new URLSearchParams(location.search).get("token");
  const token = tokenParam ? JSON.parse(decodeURIComponent(tokenParam)) : null;

  useEffect(() => {
    const fetchMaterialDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/materials/${materialId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch material details');
        }

        const data = await response.json();
        setMaterial(data);
      } catch (error) {
        console.error('Error fetching material details:', error);
      }
    };

    if (token) {
      fetchMaterialDetails();
    }
  }, [materialId, token]);

  if (!material) {
    return <div>Loading...</div>;
  }

  const isUserLocationInMaterial = material.locations.includes(token?.userLocation || '');

  return (
    <div><Header />
      <div className="Container">
        <div className="material-info">
          <h2 className="material-name">{material.name}</h2>
          <p className="material-description">{material.description}</p>
          <p className="material-description">
            <span className={isUserLocationInMaterial ? 'green-text' : 'red-text'}>
              {token?.userLocation}
            </span>
          </p>
          <ul className="location-list">
            {material.locations.map((location) => (
              <li key={location} className="location-item">{location}</li>
            ))}
          </ul>
          <div className="alternatives">
            <h3>Alternatives:</h3>
            <ul>
              {material.alternatives.map((alternative) => (
                <li key={alternative._id}>
                  <Link to={`/materials/${alternative._id}?token=${encodeURIComponent(JSON.stringify(token))}`}>
                    {alternative.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetail;
