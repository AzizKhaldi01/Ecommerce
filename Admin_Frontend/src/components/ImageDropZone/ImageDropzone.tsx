// ImageDropzone.tsx

import React from "react";
import { useDropzone } from "react-dropzone";
import { Add01Icon, Drag01Icon, Image02Icon } from "hugeicons-react";
import { ButtonBase } from "@mui/material";

// TypeScript types for props, if needed
interface ImageDropzoneProps {
  onDrop?: (acceptedFiles: File[]) => void;
  calssName?: string;
  isSmall?: boolean;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onDrop,
  calssName,
  isSmall,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    multiple: true,
  });

  return (
    <ButtonBase className="   absolute top-0 right-0 w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed  w-full  rounded-lg p-6 cursor-pointer flex ${
          isSmall && "m-2"
        }  ${calssName}  justify-center items-center transition-colors 
                  ${
                    isDragActive
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300 bg-white"
                  }`}
      >
        <input {...getInputProps()} />
        {isSmall ? (
          <span className="text-gray-600 flex flex-col gap-3 items-center">
            <Add01Icon className="scale-150" size={25} />
          </span>
        ) : isDragActive ? (
          <span className=" text-center  text-gray-600 flex flex-col gap-5 items-center">
            <Drag01Icon className="scale-150" size={25} />
            <p>Drop the images here...</p>
          </span>
        ) : (
          <span className="  text-center text-gray-600 flex flex-col gap-5 items-center">
            <Image02Icon className="scale-150" size={25} />
            <p>Drag & drop images here, or click to select files</p>
          </span>
        )}
      </div>
    </ButtonBase>
  );
};

export default ImageDropzone;
