import React, { useContext, useEffect, useMemo, useState } from "react";
import {loadStripe} from '@stripe/stripe-js';
import axios from "axios";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency.js";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartProductQuantity,setCartProductQuantity] = useState(0);
  const [cartProductPrice,setCartProductPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const { cartProductCount,fetchUserAddToCartCount } = useContext(Context);

  const loadingList = new Array(cartProductCount).fill(null);

  const fetchCartProducts = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/viewcartproducts",
      {
        withCredentials: true,
      }
    );

    const dataResponse = response?.data?.data;

    if (response.data.success) {
      const Products = dataResponse.map((product, idx) => {
        return {
          _id: product._id,
          productId: product.productId._id,
          productName: product.productId.productName,
          brandName: product.productId.brandName,
          category: product.productId.category,
          description: product.productId.description,
          price: product.productId.price,
          sellingPrice: product.productId.sellingPrice,
          productImages: product.productId.productImages,
          quantity: product.quantity,
        };
      });
      const quantity = Products.reduce((prev,curr) => prev + curr.quantity,0);
      const Subtotalprice = Products.reduce((prev,curr) => prev + curr.sellingPrice*curr.quantity,0);

      setCartProductQuantity(quantity);
      setCartProductPrice(Subtotalprice);
      setCartProducts(Products);
    }
  };

  const increaseQty = async (id, qty) => {
    const response = await axios.post(
      "http://localhost:8080/api/update-cart-product",
      {
        _id: id,
        quantity: qty + 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const dataResponse = response.data;
    if (dataResponse.success) {
      await fetchCartProducts();
    }

    if (dataResponse.error) {
      console.log(dataResponse.error);
      toast.error("Update Failed");
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await axios.post(
        "http://localhost:8080/api/update-cart-product",
        {
          _id: id,
          quantity: qty - 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const dataResponse = response.data;
      if (dataResponse.success) {
        await fetchCartProducts();
      }

      if (dataResponse.error) {
        console.log(dataResponse.error);
        toast.error("Update Failed");
      }
    }
  };

  const deleteProductFromCart = async (id) => {
    const response = await axios.post(
      "http://localhost:8080/api/delete-cart-product",
      {
        _id: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const dataResponse = response.data;
    if (dataResponse.success) {
      await fetchCartProducts();
      await fetchUserAddToCartCount();
    }

    if (dataResponse.error) {
      console.log(dataResponse.error);
      toast.error("Update Failed");
    }
  };

  const handlePayment = async() => {
    const stripePromise = await loadStripe("pk_test_51QaWbw093v1VV952qUCiT9jzqG7twjDNk5FG8229oWraFhEAMXwGo2udE8XxVBJ4koYQTfJjzyfKoTUGyqqcDwf6007FJXxqzw");
    const response = await axios.post(
      "http://localhost:8080/api/checkout",
      {
        cartItems : cartProducts
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    )

    if(response?.data?.id) {
      stripePromise.redirectToCheckout({sessionId:response?.data?.id});
    }
  }
  
  const handleLoading = async() => {
    await fetchCartProducts();
  }

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const cartSummary = useMemo(() => ({
    totalQuantity: cartProductQuantity,
    totalPrice: cartProductPrice,
  }), [cartProductQuantity, cartProductPrice]);

  return (
    <div className="container px-4 mx-auto my-4">
      <div className="text-center text-lg my-3">
        {cartProducts.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:justify-between">
        {/* Cart Products  */}
        <div className="w-full max-w-3xl">
          {loading ? (
            loadingList.map((el, idx) => {
              return (
                <div
                  key={idx + "CartProduct"}
                  className="w-full mx-auto bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse"
                ></div>
              );
            })
          ) : (
            <div>
              {cartProducts.map((product, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-full mx-auto bg-white h-32 my-2 border border-slate-300 flex"
                  >
                    <div className="min-h-32 min-w-32 max-w-32 bg-slate-200">
                      <img
                        src={product?.productImages[0]}
                        alt="Image"
                        className="h-full w-full object-scale-down mix-blend-multiply"
                      />
                    </div>

                    <div className="relative w-full px-4 py-2">
                      <div
                        className="absolute right-0 text-red-600 rounded-full p-2 md:text-xl lg:text-2xl hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => deleteProductFromCart(product?._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-base lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productName}
                      </h2>

                      <p className="capitalize text-slate-600">
                        {product?.category}
                      </p>

                      <div className="flex items-center justify-between overflow-hidden">
                        <p className="text-red-600 font-medium text-lg">
                          {displayINRCurrency(product?.sellingPrice)}
                        </p>
                        <p className="text-slate-500 font-semibold text-lg ">
                          {displayINRCurrency(product?.sellingPrice*product?.quantity)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 rounded flex justify-center items-center"
                          onClick={() =>
                            decreaseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 rounded flex justify-center items-center"
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {
          cartProducts[0] && (
            <div className="mt-5 lg:mt-2 w-full lg:max-w-sm">
              {loading ? (
                <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
              ) : (
                <div className="min-h-36 w-full md:w-full sm:w-full bg-white border border-slate-300 ">
                  <h2 className="bg-red-600 font-medium text-lg text-white px-4 py-1">Summary</h2>

                  <div className="flex items-center gap-5 px-4 font-medium text-lg mt-2">
                    <p className="text-slate-500">Quantity :</p>
                    <p>{cartSummary.totalQuantity}</p>
                  </div>

                  <div className="flex items-center gap-5 px-4 font-medium text-lg ">
                    <p className="text-slate-500">Subtotal :</p>
                    <p>{displayINRCurrency(cartSummary.totalPrice)}</p>
                  </div>

                  <div className="flex items-center justify-center">
                    <button className="w-1/2 bg-red-600 hover:bg-red-700 text-white mt-1 px-4 py-1 rounded-full" onClick={handlePayment}>
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Cart;
