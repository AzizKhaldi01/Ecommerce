import { useCallback } from 'react';

export const useReorder = (images: File[], setImages: (images: File[]) => void) => {
  const reorderImages = useCallback((sourceIndex: number, destinationIndex: number) => {
    const reorderedImages = Array.from(images);
    const [movedImage] = reorderedImages.splice(sourceIndex, 1);
    reorderedImages.splice(destinationIndex, 0, movedImage);
    setImages(reorderedImages);
  }, [images, setImages]);

  return reorderImages;
};
