export type TPost = {
  _id: string;
  title: string;
  body: string;
  materials: Array<{
    _id: string;
    name: string;
    locations: string[]; // Assuming each location is a string
    description: string;
  }>;
  // Add other fields as needed
};

export async function getPosts(): Promise<TPost[]> {
  const response = await fetch("http://localhost:5000/posts");
  return response.json();
}
