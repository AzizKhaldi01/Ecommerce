import React from "react";

interface UserItem {
  name: string;
  image: string;
}

interface AvatarProps {
    userData: UserItem; // Single user instead of an array
}

const Avatar: React.FC<AvatarProps> = ({ userData }) => {
  return (
    <div className=" flex items-center gap-3 ">
      <img
        className=" h-[3rem] w-[3rem]  rounded-[50%] "
        src={userData.image}
        alt=""
        />
        {userData.name}
    </div>
  );
};

export default Avatar;
