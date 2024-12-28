import React, { useContext } from "react";
import { Link } from "react-router-dom";
import displayINRCurrency from "../helpers/displayCurrency.js";
import Context from "../context/index.js";
import addToCart from "../helpers/addToCart.js";

const QueryProducts = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCartCount } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    await fetchUserAddToCartCount();
  };
  
  return (
    <div className="grid lg:grid-cols-[repeat(auto-fit,minmax(300px,300px))] md:grid-cols-[repeat(auto-fit,minmax(300px,300px))] justify-between md:gap-3">
      {loading
        ? loadingList.map((product, idx) => {
            return (
              <div
                key={"loading" + idx}
                className="bg-white w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] shadow-md rounded-sm"
              >
                <div className="bg-slate-200 flex items-center justify-center h-32 md:h-48 p-2 min-w-[280px] md:min-w-[145px] animate-pulse">
                  <img className="h-full" />
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <div className="group">
                    <h2 className="bg-slate-200 py-2 rounded-full animate-pulse"></h2>
                    {/* <h2 className='absolute z-10 -top-2 left-3 hidden text-slate-500 whitespace-nowrap px-2 py-1 group-hover:block overflow-visible'>{product?.productName}</h2> */}
                  </div>
                  <p className="bg-slate-200 py-2 rounded-full animate-pulse"></p>

                  <div className="flex justify-between w-full">
                    <p className="w-1/3 bg-slate-200 py-2 px-1 rounded-full animate-pulse"></p>
                    <p className="w-1/3 bg-slate-200 py-2 px-1 rounded-full animate-pulse"></p>
                  </div>

                  <div className="w-full bg-slate-200 mt-2 px-3 py-2 rounded-full animate-pulse"></div>
                </div>
              </div>
            );
          })
        : data.map((product, idx) => {
            return (
              <Link
                to={"/product/" + product?._id}
                key={product._id}
                className="bg-white w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] shadow-md rounded-sm"
              >
                <div className="bg-slate-200 flex items-center justify-center h-32 md:h-48 p-2 min-w-[280px] md:min-w-[145px] ">
                  <img
                    src={product?.productImages[0]}
                    className="h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>

                <div className="p-4 flex flex-col relative">
                  <div className="group">
                    <h2 className="text-base md:text-lg font-medium text-ellipsis line-clamp-1">
                      {product?.productName}
                    </h2>
                    {/* <h2 className='absolute z-10 -top-2 left-3 hidden text-slate-500 whitespace-nowrap px-2 py-1 group-hover:block overflow-visible'>{product?.productName}</h2> */}
                  </div>
                  <p className="capitalize text-gray-500">
                    {product?.brandName}
                  </p>

                  <div className="flex justify-evenly">
                    <p className="text-red-600 font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>

                  <button
                    className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full transition-all duration-300"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default QueryProducts;
