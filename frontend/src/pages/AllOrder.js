import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency.js";

const AllOrder = () => {
  const [orderData, setOrderData] = useState([]);

  const userId = useParams().userId;

  const fetchOrders = async () => {

    const response = await axios.get("http://localhost:8080/api/all-order", {
      headers: {
        userId: userId,
      },
      withCredentials: true,
    });

    const dataResponse = response.data.data;

    if (response.data.success) {
      setOrderData(dataResponse);
    }

    if (response.data.error) {
      console.log(response.data.message);
      toast.error("Error in fetching Orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orderData);
  return (
    <div className="h-[calc(100vh-125px)] max-h-[calc(100vh-125px)] overflow-y-scroll scroll-none">
      {!orderData[0] && <p>No Order Available</p>}

      <div className="p-4">
        {orderData.map((order, idx) => {
          return (
            <div key={order._id + idx} className="border-2 my-2 bg-slate-200">
              <p className="text-lg font-medium">
                {moment(order.createdAt).format("MMM DD, YYYY h:mm A")}
              </p>
              <div className="flex lg:flex-row flex-col justify-between">
                {/* product data  */}
                <div>
                  {order?.productDetails.map((product, idx) => {
                    return (
                      <div
                        className="flex flex-row bg-slate-200 mt-2"
                        key={product.productId + idx}
                      >
                        <div>
                          <img
                            className="p-2 w-28 h-28 max-w-28 max-h-28 bg-white object-scale-down"
                            src={product?.image[0]}
                            alt="Product Image"
                          />
                        </div>

                        <div className="flex flex-col gap-3 px-4">
                          <div className="font-medium text-lg text-ellipsis line-clamp-1">
                            <p className="">{product.name}</p>
                          </div>
                          <div className="flex flex-row gap-5">
                            <p className="">Quantity: {product.quantity}</p>
                            <p className="text-red-500 font-medium">
                              {displayINRCurrency(product.price)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-4 mr-[100px]">
                  {/* payment details  */}
                  <div className="p-2">
                    <p className="text-lg font-medium">Payment Details:</p>
                    <div>
                      <p>
                        Payment Method:{" "}
                        {order?.paymentDetails.payment_method_types[0]}
                      </p>
                      <p>
                        Payment Status: {order?.paymentDetails.payment_status}
                      </p>
                    </div>
                  </div>
                  {/* shipping details  */}
                  <div className="p-2">
                    <p className="font-medium text-lg">Shipping Details:</p>
                    {order?.shipping_options.map((shipping, idx) => {
                      return (
                        <div key={shipping.shipping_rate}>
                          <p>
                            Charges:{" "}
                            <span className="font-medium text-red-500">
                              {displayINRCurrency(shipping.shipping_amount)}
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Total Amout  */}
              <div className="ml-auto w-fit">
                <p className="font-semibold text-lg">
                  Total Amount:{" "}
                  <span className="text-red-500 font-medium">
                    {displayINRCurrency(order?.totalAmount)}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllOrder;
