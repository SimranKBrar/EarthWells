export async function createPost(title: string, body: string) {
  const response = await fetch('http://localhost:5000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }), // Include both title and body
  });
  return response.json();
}