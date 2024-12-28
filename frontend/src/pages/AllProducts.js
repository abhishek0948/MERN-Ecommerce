import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import axios from "axios";
import { toast } from "react-toastify";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [showUploadProduct, setShowUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/all-products",
        {
          withCredentials: true,
        }
      );

      const dataResponse = response?.data;
      const Products = dataResponse?.data;
      // console.log("Fetched Products:", Products);

      setAllProducts(Products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Error in fetching Products");
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="w-full">
      <div className="w-auto flex bg-white px-4 py-2 justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full py-1 px-1 transition-all"
          onClick={() => setShowUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* All Product */}
      <div className="w-full flex flex-wrap items-start gap-7 max-h-[80vh] overflow-y-auto pt-2">
        {allProducts.map((product, idx) => {
          return (
            <AdminProductCard
              data={product}
              key={product._id}
              fetchAllProducts={fetchAllProducts}
            />
          );
        })}
      </div>

      {/* upload Product Compo*/}
      {showUploadProduct && (
        <UploadProduct
          fetchAllProducts={fetchAllProducts}
          onClose={() => setShowUploadProduct(false)}
        />
      )}
    </div>
  );
};

export default AllProducts;
