import React from "react";

interface PriceDetailsProps {
  price: number;
  discount: number;
}

const PriceDetails: React.FC<PriceDetailsProps> = ({ price, discount }) => {
  const data = [
    { title: "Based Price", value: price },
    { title: "Discount", value: discount },
    { title: "Price", value: discount == 0 ? price : discount * price },
  ];
  return (
    <div className=" ">
        <h3 className=" pb-2" >Price Details</h3>
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

export default PriceDetails;
