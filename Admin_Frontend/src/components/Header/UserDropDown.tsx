import React from "react";

interface UserDropDownProps {
  title: string;
  count: number;
  onClick: () => void;
}

const UserDropDown: React.FC<UserDropDownProps> = ({
  title,
  count,
  onClick,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
};

export default UserDropDown;
