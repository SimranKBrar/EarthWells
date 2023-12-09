const MATERIALS_API_URL = 'http://localhost:5000/materials';
const TAGS_API_URL = 'http://localhost:5000/tags';

export const fetchMaterials = async () => {
  try {
    const response = await fetch(MATERIALS_API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching materials:', error);
    return [];
  }
};

export const fetchTags = async () => {
  try {
    const response = await fetch(TAGS_API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
};