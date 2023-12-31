import React, { useState, useEffect } from 'react';
import Header from "./Header";
import "./css/MaterialForm.css"

interface Material {
  _id: string;
  name: string;
}

const AddMaterialForm: React.FC = () => {
  const [materialData, setMaterialData] = useState<{
    name: string;
    locations: string[];
    description: string;
    alternatives: string[];
  }>({
    name: '',
    locations: [],
    description: '',
    alternatives: [],
  });

  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedAlternatives, setSelectedAlternatives] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/materials')
      .then((response) => response.json())
      .then((data) => setMaterials(data))
      .catch((error) => console.error('Error fetching materials:', error));
    console.log(materials);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (e.target.nodeName === 'SELECT' && name === 'alternatives') {
      const selectedAlternatives = Array.from(
        (e.target as HTMLSelectElement).selectedOptions,
        (option) => option.value
      );
      setMaterialData((prevData) => ({
        ...prevData,
        alternatives: selectedAlternatives,
      }));
    } else {
      setMaterialData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleLocationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMaterialData((prevData) => ({
      ...prevData,
      locations: value.split(',').map((location) => location.trim()),
    }));
  };

  const handleAlternativesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedAlternatives((prevSelected) => {
      if (e.target.checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((id) => id !== value);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const materialDataWithAlternatives = {
      ...materialData,
      alternatives: selectedAlternatives,
    };

    try {
      const response = await fetch('http://localhost:5000/materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(materialDataWithAlternatives),
      });

      if (response.ok) {
        const createdMaterial = await response.json();
        console.log('Material created:', createdMaterial);
      } else {
        console.error('Failed to create material:', response.status);
      }
    } catch (error) {
      console.error('Error creating material:', error);
    }
  };

  return (
    <div > <Header /> <div className="matformcontiner"><div className="matformcont">
      <form onSubmit={handleSubmit}>
        <div className="matformname">
          <h1>Add a Material</h1>
          <label>
            Material Name:
            <input type="text" name="name" value={materialData.name} onChange={handleChange} />
          </label>
        </div>
        <br />
        <div className="matformcontlocations">
          <label>
            Locations (comma-separated):
            <input
              type="text"
              name="locations"
              value={materialData.locations.join(',')}
              onChange={handleLocationsChange}
            />
          </label>
        </div>
        <br />
        <div className="matformcontdesc">
          <label>
            Description:
            <textarea name="description" value={materialData.description} onChange={handleChange} />
          </label>
        </div>
        <br />
        <div className="matformcontalt">
          <label>
            Alternatives:
            {materials.map((material) => (
              <div key={material._id}>
                <input
                  type="checkbox"
                  name="alternatives"
                  value={material._id}
                  checked={selectedAlternatives.includes(material._id)}
                  onChange={(e) => handleAlternativesChange(e)}
                />
                <span className="matformspan">{material.name}</span>
              </div>
            ))}
          </label>
        </div>
        <br />
        <button className="matformcontbutton" type="submit">Add Material</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default AddMaterialForm;
