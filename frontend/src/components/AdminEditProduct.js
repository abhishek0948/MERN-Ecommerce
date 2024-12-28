import React, { useState } from "react";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayProductImage from "./DisplayProductImage";
import { IoCloseCircle } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import {toast}  from "react-toastify";
import axios from "axios";

const AdminEditProduct = ({ data ,onClose,fetchAllProducts }) => {
  const [newdata, setData] = useState(data);

  const [fullScreenImg, setFullScreenImg] = useState("");
  const [openFullScreen, setOpenFullScreen] = useState(false);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImages: [...prev.productImages, uploadImageCloudinary.url],
      };
    });
  };

  //Image Delete
  const handleDeleteProductImage = async (idx) => {
    const newProductImages = [...data.productImages];
    newProductImages.splice(idx, 1);

    setData((prev) => {
      return {
        ...prev,
        productImages: [...newProductImages],
      };
    });
  };

  // Submit Upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newdata.productName ||
      !newdata.brandName ||
      !newdata.price ||
      !newdata.sellingPrice ||
      !newdata.productImages ||
      !newdata.description ||
      !newdata.category
    ) {
      return toast.warning("Please Fill all the fields");
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/edit-product",
        newdata,
        {
          withCredentials: true,
        }
      );

      const dataResponse = response.data;
      console.log("Printing Data:", dataResponse);
      if (dataResponse.success) {
        toast.success(dataResponse.message);
        await fetchAllProducts();
        onClose();
      }

      if (dataResponse.error) {
        toast.warning(dataResponse.message);
      }
    } catch (e) {
      toast.error("Error in Editing Product");
      console.log(e);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-60 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="p-4 bg-white w-full rounded max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-4">
          <h2 className="font-medium text-lg">Edit Product</h2>
          <button className="text-2xl" onClick={onClose}>
            <IoCloseCircle className="rounded-full bg-white text-red-500 hover:text-red-700" />
          </button>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            name="productName"
            id="productName"
            value={newdata.productName}
            placeholder="Enter Product name..."
            onChange={handleOnChange}
            className="bg-slate-100 border rounded p-2"
          />

          <label htmlFor="brandName" className="mt-2">
            Brand Name :
          </label>
          <input
            type="text"
            name="brandName"
            id="brandName"
            value={newdata.brandName}
            placeholder="Enter Brand name..."
            onChange={handleOnChange}
            className="bg-slate-100 border rounded p-2"
          />

          <label htmlFor="category" className="mt-2">
            Category :
          </label>
          <select
            value={newdata.category}
            name="category"
            id="category"
            className="bg-slate-100 border rounded p-2"
            onChange={handleOnChange}
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, idx) => {
              return (
                <option key={el.value + el.id} value={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-2">
            Product Images :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-5xl">
                  <IoMdCloudUpload />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </label>

          {/* Images */}
          <div>
            {newdata.productImages[0] ? (
              <div className="flex items-center gap-2">
                {newdata.productImages.map((el, idx) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt="el"
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer hover:scale-105 transition-all"
                        onClick={() => {
                          setOpenFullScreen(true);
                          setFullScreenImg(el);
                        }}
                      />
                      <span
                        className="absolute right-0 bottom-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(idx)}
                      >
                        <MdDelete />
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-500 text-xs w-full flex justify-center">
                *please upload images
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-2">
            Price :
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={newdata.price}
            placeholder="Enter Price..."
            onChange={handleOnChange}
            className="bg-slate-100 border rounded p-2"
          />

          <label htmlFor="sellingPrice" className="mt-2">
            Selling Price :
          </label>
          <input
            type="number"
            name="sellingPrice"
            id="sellingPrice"
            value={newdata.sellingPrice}
            placeholder="Enter Selling Price..."
            onChange={handleOnChange}
            className="bg-slate-100 border rounded p-2"
          />

          <label htmlFor="description" className="mt-2">
            Description :
          </label>
          <textarea
            name="description"
            id="description"
            value={newdata.description}
            placeholder="Description of Product..."
            onChange={handleOnChange}
            className="bg-slate-100 border rounded p-2 w-full h-24 resize-none"
          />

          <button
            type="submit"
            className="px-3 py-2 mb-10 bg-red-500 hover:bg-red-700 text-white rounded-md"
          >
            Edit Product
          </button>
        </form>
      </div>

      {/* display full Product Image */}
      {openFullScreen && (
        <DisplayProductImage
          imgUrl={fullScreenImg}
          onClose={() => setOpenFullScreen(false)}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
