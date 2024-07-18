import React from "react";

const SliderItemProduct = ({ product }) => {
  return (
    <div
      key={product.id}
      className="w-1/3 h-full flex-shrink-0 flex items-center justify-center p-4"
    >
      <div className="text-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-36 h-32 object-cover mx-auto mb-4"
        />
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-700 text-sm">{product.description}</p>
        <p className="text-indigo-800 font-semibold">{product.price}</p>
      </div>
    </div>
  );
};

export default SliderItemProduct;
