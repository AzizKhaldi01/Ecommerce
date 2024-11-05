import React from "react";
import Avatar from "../UI/Avatar";
import { ArrowDown01Icon } from "../../assets/login/icons/ArrowDownIcon";

interface UserItem {
  name: string;
  image: string;
}

interface UserDropDownProps {
  userData: UserItem; // Single user instead of an array
}

const UserDropDown: React.FC<UserDropDownProps> = ({ userData }) => {

  return (
    <div className=" flex items-center pr-1 p-[0.15rem]  cursor-pointer  border-[1px] border-gray-300 rounded-full  gap-4 ">
      <Avatar userData={userData} />
      <ArrowDown01Icon/>
    </div>
  );
};

export default UserDropDown;
