import React from "react";
import { IoMdCheckmark } from "react-icons/io";

const ServiceOverview = ({description}) => {
  return (
    <div>
      <div className="mt-8 ">
        <h3 className="text-xl font-bold text-gray-800">Service Description</h3>
        <p className="text-sm text-white mt-4">
         {description}
        </p>
      </div>

      <ul className="space-y-3 list-disc mt-6 pl-4 text-sm text-gray-400">
        <div className="">
          <IoMdCheckmark className="inline " /> A gray t-shirt is a wardrobe
          essential because it is so versatile.
        </div>
        <div className="">
          <IoMdCheckmark className="inline " /> A gray t-shirt is a wardrobe
          essential because it is so versatile.
        </div>
        <div className="">
          <IoMdCheckmark className="inline" /> A gray t-shirt is a wardrobe
          essential because it is so versatile.
        </div>
      </ul>
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800">Include Service</h3>
        <p className="text-sm text-white mt-4">
          Elevate your casual style with our premium men's t-shirt. Crafted for
          comfort and designed with a modern fit, this versatile shirt is an
          essential addition to your wardrobe. The soft and breathable fabric
          ensures all-day comfort, making it perfect for everyday wear. Its
          classNameic crew neck and short sleeves offer a timeless look.
        </p>
      </div>
      <ul className="space-y-3 list-disc mt-6 pl-4 text-sm text-gray-400">
        <div>
          <IoMdCheckmark className="inline" /> A gray t-shirt is a wardrobe
          essential because it is so versatile.
        </div>
        <div>
          <IoMdCheckmark className="inline" /> A gray t-shirt is a wardrobe
          essential because it is so versatile.
        </div>
        <div>
          <IoMdCheckmark className="inline" /> A gray t-shirt is a wardrobe
          essential because it is so versatile.
        </div>
      </ul>
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800">Exclude Service</h3>
        <p className="text-sm text-white mt-4">
          Elevate your casual style with our premium men's t-shirt. Crafted for
          comfort and designed with a modern fit, this versatile shirt is an
          essential addition to your wardrobe. The soft and breathable fabric
          ensures all-day comfort, making it perfect for everyday wear. Its
          classNameic crew neck and short sleeves offer a timeless look.
        </p>
      </div>
      <ul className="space-y-3 list-disc mt-6 pl-4 text-sm text-gray-400">
        <div>
          <IoMdCheckmark className="inline" /> A gray t-shirt is a wardrobe
          essential because it is so versatile.
        </div>
        <div>
          <IoMdCheckmark className="inline" /> A gray t-shirt is a wardrobe
          essential because it is so versatile.
        </div>
        <div>
          <IoMdCheckmark className="inline" /> A gray t-shirt is a wardrobe
          essential because it is so versatile.
        </div>
      </ul>
    </div>
  );
};

export default ServiceOverview;