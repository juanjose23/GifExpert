export const getGifs = async (category) => {
  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=qKkAI1AaZhtvAjEAhqpFAw1UgCvYCtey&q=${category}&limit=8`;

    const resp = await fetch(url);
    
    if (!resp.ok) {
      throw new Error('Error fetching gifs');
    }

    const { data } = await resp.json();

    const gifs = data.map(img => ({
      id: img.id,
      title: img.title,
      url: img.images.downsized_medium.url
    }));

    return gifs;
  } catch (error) {
    console.error('Error fetching gifs:', error);
    return [];  // Retorna un array vacío en caso de error
  }
}
