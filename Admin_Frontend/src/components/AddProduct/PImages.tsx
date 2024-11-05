import React from "react";
import DropzoneWithSort from "../DropzoneWithSort/DropzoneWithSort";

interface PImagesProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const PImages: React.FC<PImagesProps> = ({ images, setImages }) => {
  return (
    <div>
      <DropzoneWithSort images={images} setImages={setImages} />
    </div>
  );
};

export default PImages;
