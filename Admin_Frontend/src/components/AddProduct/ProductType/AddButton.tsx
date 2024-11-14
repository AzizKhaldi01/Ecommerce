import React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { Add01Icon } from "hugeicons-react";

interface AddButtonProps {
  onClick: () => void; // Function to handle the button click
  size?: string; // Size of the button (default is '20vh')
}

const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  size = " lg:h-[10rem] h-[8rem]  lg:w-[15rem] w-[10rem] ",
}) => {
  return (
    <div className=" flex items-center justify-center">
      <ButtonBase
        sx={{
          "& .MuiTouchRipple-root .MuiTouchRipple-child": {
            backgroundColor: "#2684FF", // Adjust the color and opacity
          },
        }}
      >
        <div
          onClick={onClick}
          className={`rounded-lg flex items-center text-main  border-main opacity-50 justify-center ${size} w-full border-dashed border-[2px]`}
        >
          <Add01Icon className=" scale-150" />
        </div>
      </ButtonBase>
    </div>
  );
};

export default AddButton;
