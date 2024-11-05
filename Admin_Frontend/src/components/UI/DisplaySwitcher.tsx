import React from "react";
import {
  LeftToRightListBulletIcon,
  DashboardSquare01Icon,
} from "hugeicons-react";
import { ButtonBase } from "@mui/material";

interface DisplaySwitchertypes {
  isTable: boolean;
  setIsTable: React.Dispatch<React.SetStateAction<boolean>>; // Use appropriate type for setter function
}

const DisplaySwitcher: React.FC<DisplaySwitchertypes> = ({
  isTable,
  setIsTable,
}) => {
  return (
    <div className=" flex border-[1px] rounded-md items-center    overflow-hidden relative w-[80px] h-[35px]  ">
      <ButtonBase
        className={` ${
          !isTable && "text-white"
        } w-full cursor-pointer  z-30 h-full flex items-end justify-center`}
        onClick={() => setIsTable(false)}
      >
        <DashboardSquare01Icon
          className={` ${!isTable && "text-main"}`}
          size={20}
        />
      </ButtonBase>
      <span className=" h-[70%] my-2 w-[1px] bg-gray-200 "></span>
      <ButtonBase
        className={` ${
          isTable && "text-white"
        }  w-full cursor-pointer z-30 h-full flex items-end justify-center`}
        onClick={() => setIsTable(true)}
      >
        <LeftToRightListBulletIcon
          className={` ${isTable && "text-main"}`}
          size={20}
        />
      </ButtonBase>
    </div>
  );
};

export default DisplaySwitcher;
