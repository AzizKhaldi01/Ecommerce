import React from "react";
import "./skeleton.css";

interface SkeletonProps {
  className?: string;
  rows?: number;
  width?: string;
  height?: string;
  index:any,
  type?: "text" | "product";
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  index,
  rows = 1,
  width = "w-full",
  height = "h-4",
  type,
}) => {
  return (
    <div key={index}>
      {type == "text" ? (
        <div className={`${className} animate-pulse space-y-2`}>
          {Array.from({ length: rows }).map((_, index) => (
            <div
              key={index}
              className={`bg-gray-200 rounded ${width} ${height}`}
            />
          ))}
        </div>
      ) : (
        <div className={`${className} animate-pulse  flex flex-col gap-3 `}>
          {Array.from({ length: rows }).map((_, index) => (
            <div key={index} className={` w-full  gap-3 flex flex-col   `}>
              <div className="  bg-gray-200 rounded-xl h-[13rem] "></div>
              <div className=" flex flex-col gap-1">
                <div className=" w-[30%] h-[1rem] bg-gray-200 mx-1"></div>
                <div className=" w-[20%] h-[1rem] bg-gray-200 mx-1"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skeleton;
