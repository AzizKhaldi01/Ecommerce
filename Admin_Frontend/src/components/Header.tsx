import "../App.css";
import UserDropDown from "./Header/UserDropDown";
import Links from "./Header/Links";
import Logo from "./Header/Logo";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useLocation } from "react-router-dom";
import {
  ChartLineData01Icon,
  DashboardSquare02Icon,
  ProductLoadingIcon,
  Settings02Icon,
  ShoppingBag02Icon,
} from "hugeicons-react";

// ExampleComponent.tsx
const Header: React.FC = () => {
  // const user = useSelector((state: RootState) => state.user);
  const location = useLocation();

  const isHidden = location.pathname == "/login";

  const LinksObj = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <DashboardSquare02Icon size={20} />,
    },
    { href: "/sales", label: "Sales", icon: <ShoppingBag02Icon size={20} /> },
    {
      href: "/analytic",
      label: "Analytic",
      icon: <ChartLineData01Icon size={20} />,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings02Icon size={20} />,
    },
    {
      href: "/Products",
      label: "Products",
      icon: <ProductLoadingIcon size={20} />,
    },
  ];

  const user = {
    name: "aziz",
    email: "azizaziz10@gmail.com",
    roles: ["admin"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s",
  };

  return (
    <div className=" w-full pt-1">
      <div
        className={` ${
          isHidden && "hidden"
        } flex items-center  lg:mx-3 mx-2 my-2 p-4  lg:px-6 px-2 justify-between rounded-[1rem] bg-white `}
      >
        <Logo />
        <Links links={LinksObj} />
        <UserDropDown userData={user} />
      </div>
    </div>
  );
};

export default Header;
