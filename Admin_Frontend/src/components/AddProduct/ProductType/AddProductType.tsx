import { Add01Icon } from "hugeicons-react";
import React, { useState } from "react";
import Button from "../../UI/Button";
import UiModal from "../../UI/Modal";
import DropzoneWithSort from "../../DropzoneWithSort/DropzoneWithSort";

interface AddProductTypeProps {
  availableCategories: string[];
}

const AddProductType: React.FC<AddProductTypeProps> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleImagesChange = (images: File[]) => {
    console.log('Ordered Images:', images);
  };

  const HandelCloseFilter = () => {
    setIsModalOpen(false);
  };

  const HandelSaveFilter = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <Button
        onClick={() => setIsModalOpen(true)}
        rippleColor="white"
        variant="contained"
      >
        <div className=" flex   text-white  gap-2 lg:text-sm text-xs items-center">
          <Add01Icon className="  lg:scale-100  scale-75 " />
        </div>
      </Button>

      <UiModal
        width={{ xs: "90%", sm: "80%", md: "60%", lg: "30%" }}
        open={isModalOpen}
        content={
          <div className=" gap-5 flex flex-col ">
            <h3>Add new type</h3>
            <div className=" flex flex-col gap-2">
              <h3>type images</h3>
              <DropzoneWithSort onImagesChange={handleImagesChange} />
            </div>
            {/* actions save & cancel */}
            <div className=" pt-7 flex justify-between w-full">
              <Button
                onClick={HandelCloseFilter}
                styles="text-black"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button rippleColor="white" onClick={HandelSaveFilter}>
                Save
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default AddProductType;
