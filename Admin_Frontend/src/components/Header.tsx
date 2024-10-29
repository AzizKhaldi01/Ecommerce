import { useState } from "react";
import "../App.css";
import UserDropDown from "./Header/UserDropDown";

// ExampleComponent.tsx
const Header: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className=" flex items-center  justify-between bg-white ">
      <UserDropDown onClick={handleClick} title="hi" count={count} />
    </div>
  );
};

export default Header;
