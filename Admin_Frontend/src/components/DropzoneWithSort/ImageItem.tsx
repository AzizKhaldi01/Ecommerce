import React from 'react';

interface ImageItemProps {
  file: File;
  index: number;
}

const ImageItem: React.FC<ImageItemProps> = ({ file }) => {
  const objectUrl = URL.createObjectURL(file);

  return (
    <div className="w-32 h-32 m-2 border rounded-lg overflow-hidden">
      <img src={objectUrl} alt={file.name} className="w-full h-full object-cover" />
    </div>
  );
};

export default ImageItem;
