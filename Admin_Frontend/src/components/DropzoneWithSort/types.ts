import React from "react";

export interface DropzoneWithSortProps {
  // onImagesChange: (images: File[]) => void;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export interface ImageItemProps {
  file: File;
  index: number;
}
