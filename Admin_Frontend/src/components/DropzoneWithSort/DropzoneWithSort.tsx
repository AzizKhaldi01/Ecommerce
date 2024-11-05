import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import ImageItem from "./ImageItem";
import { DropzoneWithSortProps } from "./types";
import useIsMobile from "../../Hooks/useMobile";

const SortableImageItem = ({ file, index }: { file: File; index: number }) => {
  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({
      id: file.name,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [thumbnail, setThumbnail] = React.useState<string | null>(null);

  React.useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={` ${
        index == 0 ? " w-full h-[50vh]  " : "w-full h-32"
      }  m-2 border rounded-lg overflow-hidden`}
    >
      {thumbnail && (
        <img
          src={thumbnail}
          alt={file.name}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

const DropzoneWithSort: React.FC<DropzoneWithSortProps> = ({
  images,
  setImages,
}) => {
 
  const isMobile = useIsMobile()


  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setImages((prevImages) => {
        const newImages = [...prevImages, ...acceptedFiles];
        console.log(acceptedFiles);
        return newImages;
      });
    },
    [images]
  );
  console.log(images);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((image) => image.name === active.id);
      const newIndex = images.findIndex((image) => image.name === over.id);
      const newImages = arrayMove(images, oldIndex, newIndex);
      setImages(newImages);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    multiple: true,
  });

  return (
    <div className="p-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 flex justify-center items-center transition-colors 
                    ${
                      isDragActive
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300 bg-white"
                    }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-600">Drop the images here...</p>
        ) : (
          <p className="text-gray-600">
            Drag & drop images here, or click to select files
          </p>
        )}
      </div>

      <div>
      {images.length > 0 && (
        <div className="flex flex-col mt-4">
          {/* Show DndContext only if not on mobile */}
          {!isMobile ? (
            <DndContext onDragEnd={handleDragEnd}>
              <SortableContext items={images.map((image) => image.name)}>
                <SortableImageItem key={images[0]?.name} file={images[0]} index={0} />
                <div className="grid gap-2 grid-cols-3">
                  {images.slice(1).map((file, index) => (
                    <SortableImageItem key={file?.name} file={file} index={index + 1} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            // Display images without drag-and-drop on mobile
            <div>
              <SortableImageItem key={images[0]?.name} file={images[0]} index={0} />
              <div className="grid gap-2 grid-cols-3">
                {images.slice(1).map((file, index) => (
                  <SortableImageItem key={file?.name} file={file} index={index + 1} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default DropzoneWithSort;
