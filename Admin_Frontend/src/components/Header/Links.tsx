import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
// Define the shape of each link item
interface LinkItem {
  href: string;
  label: string;
  icon: JSX.Element;
}

// Define the props interface
interface LinksProps {
  links: LinkItem[];
}

// Define the functional component
const Links: React.FC<LinksProps> = ({ links }) => {
  const location = useLocation();
  const isSameLink = (link: string) => location.pathname.startsWith(link);
  return (
    <div className="flex flex-row gap-10  h-full">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.href}
          className={` relative flex gap-2 items-center h-full ${
            isSameLink(link.href) && "text-main"
          } `}
        >
          {link.icon}

          {link.label}
          {isSameLink(link.href) && (
            <motion.div
              layoutId="underline"
              className=" abnolute top-0 h-1 w-full rounded-full  bg-main"
              style={{
                width: "calc(100%)",
                left: "0rem",
                top: "200%",
                position: "absolute",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </Link>
      ))}
    </div>
  );
};

export default Links;
