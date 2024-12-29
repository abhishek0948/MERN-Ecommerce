import React from "react";
import successImg from "../assest/Success.gif";
import {Link}  from "react-router-dom";
import { useSelector } from "react-redux";

const PaymentSuccess = () => {
  const user = useSelector((state) => state?.user?.user || {});
  
  return (
    <div className="bg-slate-200 rounded-md my-4 min-h-[calc(100vh-160px)] mx-auto w-full max-w-md flex justify-center  items-center flex-col">
      <img  className="rounded-full" height={250} width={250} src={successImg} alt="Success" />
      <h1 className="text-green-600 font-bold text-xl">Payment Success</h1>
      <Link to={'/order/'+user._id} className="p-2 px-3 mt-8 rounded font-semibold text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white transition-all">See Order</Link>
    </div>
  );
};

export default PaymentSuccess;
