import React from "react";

interface ViwesandOrdersStatusProps {
  ViwesNumber: number;
  orders: number;
}

const ViwesandOrdersStatus: React.FC<ViwesandOrdersStatusProps> = ({
  ViwesNumber,
  orders,
}) => {
  const data = [
    { title: "Number of views", value: ViwesNumber },
    { title: "Orders", value: orders },
  ];
  return (
    <div className=" ">
      <h3 className=" pb-2">Statistic</h3>
      <div className="  flex justify-between px-2 items-center">
        {data.map((item) => (
          <div className=" flex flex-col gap-2">
            <h5>{item.title}</h5>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViwesandOrdersStatus;
