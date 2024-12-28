import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import displayINRCurrency from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Context from "../context";
import addToCart from "../helpers/addToCart";

const ProductDetail = () => {
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImage, setZoomImage] = useState(false);
  const [imageCoordinate, setImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const { fetchUserAddToCartCount } = useContext(Context);
  const productImageList = new Array(4).fill(null);
  const params = useParams();
  const navigate = useNavigate();

  const handleMouseEnter = (imgURL) => {
    setActiveImage(imgURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setImageCoordinate({ x, y });
    },
    [imageCoordinate]
  );

  const fetchProductDetails = async () => {
    try {
      const id = params.id;
      // console.log(id);
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/product-details",
        {
          params: { id },
        }
      );
      // console.log(response.data);
      setProductData(response.data?.data);
      setActiveImage(response.data?.data?.productImages[0]);
      setLoading(false);
    } catch (err) {
      setError(true);
      toast.error("Error in fetching Product Details");
    }
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    await fetchUserAddToCartCount();
  };

  const handleBuyNow = async (e, id) => {
    await addToCart(e, id);
    await fetchUserAddToCartCount();
    navigate('/cart')
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params.id]);

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* product Images */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          {/* Main Image */}
          {loading ? (
            <div className="bg-slate-200 min-h-[300px] min-w-[300px] lg:h-96 lg:w-96 animate-pulse"></div>
          ) : (
            <div className="relative bg-slate-200 min-h-[300px] min-w-[300px] lg:h-96 lg:w-96">
              <img
                src={activeImage}
                alt=""
                className="h-full w-full object-scale-down mix-blend-multiply"
                onMouseMove={handleZoomImage}
                onMouseLeave={() => setZoomImage(false)}
              />

              {/* zoom image */}
              {zoomImage && (
                <div className="absolute hidden lg:block top-0 -right-[520px] overflow-hidden bg-slate-200 min-h-[400px] min-w-[500px] p-1">
                  <div
                    className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125"
                    style={{
                      background: `url(${activeImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPositionX: `${imageCoordinate.x * 100}%`,
                      backgroundPositionY: `${imageCoordinate.y * 100}%`,
                    }}
                  ></div>
                </div>
              )}
            </div>
          )}

          {/* Side Images */}
          <div className="h-full">
            {loading ? (
              <div className="flex lg:flex-col gap-2 overflow-scroll scroll-none h-full">
                {productImageList.map((el, idx) => {
                  return (
                    <div
                      key={idx}
                      className="w-20 h-20 bg-slate-200 rounded animate-pulse"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex md:justify-evenly sm:justify-evenly lg:flex-col gap-2 overflow-scroll scroll-none h-full">
                {productData?.productImages?.map((imgURL, idx) => {
                  return (
                    <div
                      key={imgURL}
                      className="w-20 h-20 bg-slate-200 rounded p-1"
                    >
                      <img
                        src={imgURL}
                        alt={""}
                        className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(imgURL)}
                        onClick={() => handleMouseEnter(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* product details */}
        {loading ? (
          <div className="flex flex-col gap-4 w-full">
            <p className="bg-slate-200 p-1 py-2 h-5 w-full rounded-full animate-pulse"></p>
            <h2 className="bg-slate-200 p-1 py-2  h-5 w-full rounded-full animate-pulse"></h2>
            <p className="bg-slate-200 p-1 py-2 h-5 w-full rounded-full animate-pulse"></p>

            <div className="bg-slate-200 p-1 py-2 h-5 w-full rounded-full animate-pulse"></div>

            <div className="flex items-center gap-3 text-2xl mt-1 font-medium ">
              <p className="bg-slate-200 p-1 py-2 h-5 w-full rounded-full animate-pulse"></p>
              <p className="bg-slate-200 p-1 py-2 h-5 w-full rounded-full animate-pulse"></p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button className="bg-slate-200 p-1 py-2 h-5 w-full rounded-full animate-pulse"></button>
              <button className="bg-slate-200 p-1 py-2 h-5 w-full rounded-full animate-pulse"></button>
            </div>

            <div className="bg-slate-200 p-1 py-2 w-full rounded-full animate-pulse">
              {/* <p className="text-slate-600 text-lg font-medium"></p> */}
              <p className="bg-slate-200 p-1 py-2 h-10 w-full rounded-full animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 lg:max-w-[700px]">
            <p className="bg-red-200 text-red-600 w-fit px-2 py-1 rounded-full">
              {productData?.brandName}
            </p>
            <h2 className="text-2xl lg:text-3xl font-medium">
              {productData?.productName}
            </h2>
            <p className="capitalize text-slate-400">{productData?.category}</p>

            <div className="text-red-500 flex items-center gap-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-3 text-2xl mt-1 font-medium ">
              <p className="text-red-500">
                {displayINRCurrency(productData?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(productData?.price)}
              </p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-red-500 text-red-500 font-medium rounded px-4 py-2 min-w-[140px] hover:text-white hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={(e) => handleBuyNow(e, productData?._id)}
              >
                Buy Now
              </button>
              <button
                className="border-2 border-red-500 text-white bg-red-600 px-4 py-2 min-w-[140px] font-medium hover:text-red-500 hover:bg-white transition duration-300 ease-in-out"
                onClick={(e) => handleAddToCart(e, productData?._id)}
              >
                Add to Cart
              </button>
            </div>

            <div className="">
              <p className="text-slate-600 text-lg font-medium">Description:</p>
              <p className="">{productData?.description}</p>
            </div>
          </div>
        )}
      </div>

      {!loading && (
        <CategoryWiseProductDisplay
          category={productData?.category}
          heading={"Recommended Product"}
        />
      )}

      {/* Customer Review to do.... */}
    </div>
  );
};

export default ProductDetail;
