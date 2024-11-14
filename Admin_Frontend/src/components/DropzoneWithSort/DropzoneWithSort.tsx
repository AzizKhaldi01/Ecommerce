import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import ImageItem from "./ImageItem";
import { DropzoneWithSortProps } from "./types";
import useIsMobile from "../../Hooks/useMobile";
import ImageDropzone from "../ImageDropZone/ImageDropzone";
import { ButtonBase, Menu, MenuItem } from "@mui/material";
import { Cancel01Icon, OptionIcon, StarsIcon } from "hugeicons-react";
import GrayLine from "../UI/GrayLine";
import useClickOutside from "../../Hooks/useClickOutSid";
import { useDispatch } from "react-redux";

const SortableImageItem = ({
  file,
  index,
  HandleDeleteImg,
  HandleMakeFirst,
}: {
  file: File;
  index: number;
  HandleDeleteImg: (index: number) => void;
  HandleMakeFirst: (index: number) => void;
}) => {
  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({
      id: file.name,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isDropDownOpend, setIsDropDownOpend] = useState<boolean>(false);
  const menuRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const handleMenuAction = (action: string) => {
    if (action === "delete") {
      HandleDeleteImg(index); // Delete the image at the given index
    } else if (action === "makeFirst") {
      HandleMakeFirst(index); // Move the image to the first position
    }
  };

  useClickOutside(menuRef, () => setIsDropDownOpend(false));

  const isFirstImg = index === 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative ${
        isFirstImg ? "w-full h-[35vh] object-cover" : "w-full h-32"
      } m-2 border rounded-lg overflow-hidden`}
    >
      {/* desctop view close */}
      <span
        onClick={(e) => {
          e.preventDefault();
          HandleDeleteImg(index); // Trigger delete on click
        }}
        className={`text-white ${
          isFirstImg ? "flex " : "lg:flex hidden"
        }   cursor-pointer z-[70] absolute  items-center justify-center top-2 right-3 rounded-full w-[2rem] h-[2rem] bg-black bg-opacity-30`}
      >
        <Cancel01Icon />
      </span>

      {/* mobile view dropDown */}
      {!isFirstImg && (
        <div className=" relative">
          <div
            onClick={() => setIsDropDownOpend(true)}
            className=" bg-black  bg-opacity-50  lg:hidden flex items-start text-2xl justify-center text-white rounded-[50%] h-[2rem] w-[2rem] absolute right-2 top-2  "
          >
            ...
          </div>

          {isDropDownOpend && (
            <div
              ref={menuRef as React.RefObject<HTMLDivElement>}
              className=" block lg:hidden top-4 rounded-lg right-3 absolute bg-white border-[1px]  "
            >
              <MenuItem onClick={() => handleMenuAction("delete")}>
                <Cancel01Icon size={16} />
              </MenuItem>
              <GrayLine />
              <MenuItem onClick={() => handleMenuAction("makeFirst")}>
                <StarsIcon size={16} />
              </MenuItem>
            </div>
          )}
        </div>
      )}

      {thumbnail && (
        <img
          src={thumbnail}
          alt={file.name}
          className="w-full h-full object-cover"
          style={{ touchAction: "none" }}
        />
      )}
    </div>
  );
};

const DropzoneWithSort: React.FC<DropzoneWithSortProps> = ({
  images,
  setImages,
}) => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Directly dispatching the new array of images
      const newImages = [...images, ...acceptedFiles];
      dispatch(setImages(newImages)); // Dispatch the updated images array to Redux
      console.log(acceptedFiles);
    },
    [dispatch, images]
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((image) => image.name === active.id);
      const newIndex = images.findIndex((image) => image.name === over.id);
      const newImages = arrayMove(images, oldIndex, newIndex);

      dispatch(setImages(newImages));
    }
  };

  const noImage = images.length > 0;

  const handleDeleteImg = (index: number) => {
    console.log("index");
    console.log(index);
    dispatch(setImages(images?.filter((_, i) => i !== index)));
  };

  // Set up the PointerSensor with an activation constraint "make a delay to  be able to click pn the image"
  const sensors = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5, // Start dragging after 5px movement
    },
  });

  const HandleMakeFirst = (index: number) => {
    // Create the updated images array
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(index, 1); // Remove the image at the specified index
    updatedImages.unshift(movedImage); // Add the removed image at the beginning of the array
    
    // Dispatch the updated images array to Redux
    dispatch(setImages(updatedImages));
  };
  

  return (
    <div>
      {!noImage && (
        <ImageDropzone
          calssName={` lg:h-[35vh] h-[20vh] `}
          onDrop={handleDrop}
        />
      )}

      <div>
        {noImage && (
          <div className="flex flex-col mt-4">
            {/* Show DndContext only if not on mobile */}
            {!isMobile ? (
              <DndContext sensors={[sensors]} onDragEnd={handleDragEnd}>
                <SortableContext items={images.map((image) => image.name)}>
                  <SortableImageItem
                    HandleMakeFirst={HandleMakeFirst}
                    key={images[0]?.name}
                    file={images[0]}
                    HandleDeleteImg={handleDeleteImg}
                    index={0}
                  />
                  <div className="grid gap-2 grid-cols-3">
                    {images?.slice(1).map((file, index) => (
                      <SortableImageItem
                        HandleMakeFirst={HandleMakeFirst}
                        key={file?.name}
                        file={file}
                        index={index + 1}
                        HandleDeleteImg={handleDeleteImg}
                      />
                    ))}
                    {noImage && (
                      <ImageDropzone
                        isSmall
                        calssName={`w-full h-32 `}
                        onDrop={handleDrop}
                      />
                    )}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              // Display images without drag-and-drop on mobile
              <div>
                <SortableImageItem
                  HandleMakeFirst={HandleMakeFirst}
                  key={images[0]?.name}
                  file={images[0]}
                  HandleDeleteImg={handleDeleteImg}
                  index={0}
                />
                <div className="grid gap-2 grid-cols-3">
                  {images.slice(1).map((file, index) => (
                    <SortableImageItem
                      HandleMakeFirst={HandleMakeFirst}
                      key={file?.name}
                      HandleDeleteImg={handleDeleteImg}
                      file={file}
                      index={index + 1}
                    />
                  ))}
                  <ImageDropzone
                    isSmall
                    calssName={`w-full h-32 `}
                    onDrop={handleDrop}
                  />
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
