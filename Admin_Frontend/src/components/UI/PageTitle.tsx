import React from "react";

interface PageTitleProps {
  title: string;
  icon: any;
}

const PageTitle: React.FC<PageTitleProps> = ({ icon, title }) => {
  return (
    <div className=" flex gap-2 items-end">
      {icon}
      <h2>{title}</h2>
    </div>
  );
};

export default PageTitle;
