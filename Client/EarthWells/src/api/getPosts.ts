export type TPost = {
    title: string;
    _id: string;
  };


export async function getPosts(): Promise<TPost[]> {

    const response = await fetch("http://localhost:5000/posts");
    return response.json();
}

