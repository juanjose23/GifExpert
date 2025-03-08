import { getGifs } from '../helpers/getGifs'; // Importa el helper
import { useState, useEffect, useCallback } from "react";

export const useFetchGifs = (category) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getImages = useCallback(async () => {
    try {
      setIsLoading(true);

  
      const newImages = await getGifs(category);

    
      setImages(newImages);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  const refresh = useCallback(() => {
    getImages();
  }, [getImages]);

  useEffect(() => {
    getImages();
  }, [category, getImages]);

  return {
    images,
    isLoading,
    refresh,
  };
};

