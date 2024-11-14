import Button from "../../UI/Button";

import React, { useState } from "react";
import UiModal from "../../UI/Modal";
import AddButton from "./AddButton";
import DropzoneWithSort from "../../DropzoneWithSort/DropzoneWithSort";

interface ProductTypeImagesProps {
  images: File[];
  setImages: any;
}

const ProductTypeImages: React.FC<ProductTypeImagesProps> = ({
  images,
  setImages,
}) => {
  const [isAddImgModalOpen, setIsAddImgModalOpen] = useState(false);
  const [preImages, setPreImages] = useState<File[]>([]);

  console.log("images");
  console.log(images);

  const IsimagesEmpty = images?.length > 0;

  const handelAcceptImages = () => {
    setImages(preImages);
    setIsAddImgModalOpen(false);
  };

  const handelAddImages = () => {
    // setPreImages(images);
    setIsAddImgModalOpen(true);
  };

  return (
    <div className=" flex flex-col gap-2">
      <h3>images</h3>
      <div className=" grid grid-cols-4 gap-3 ">
        {IsimagesEmpty &&
          images?.slice(0, 3).map((img, index) => (
            <div
              key={index}
              className="border-[1px] rounded-lg w-full h-[5.5rem] relative"
            >
              {index === 2 && (
                <span className="text-white rounded-lg bg-black absolute w-full h-full top-0 right-0 z-30 flex items-center justify-center opacity-70">
                  +{Math.abs(images?.length - 4)}
                </span>
              )}
              <img
                className="absolute top-0 right-0 w-full h-full object-cover rounded-lg"
                src={URL.createObjectURL(img)}
                alt="images"
              />
            </div>
          ))}

        <AddButton
          onClick={handelAddImages}
          size="h-[5.5rem]  lg:w-[9vw] w-[18vw]  w-[18vw] sm:w-[16vw] md:w-[10vw] lg:w-[7.5vw]    "
        />
      </div>

      <UiModal
        width={" w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%]"}
        open={isAddImgModalOpen}
        content={
          <div className=" flex flex-col gap-3">
            <div className="  max-h-[80vh]  overflow-y-auto overflow-hidden ">
              <DropzoneWithSort images={preImages} setImages={setPreImages} />
            </div>
            <div className=" pt-7 flex justify-between w-full">
              <Button
                onClick={() => setIsAddImgModalOpen(false)}
                styles="text-black"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button rippleColor="white" onClick={handelAcceptImages}>
                Save
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ProductTypeImages;
