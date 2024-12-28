import React from 'react'
import { Link } from 'react-router-dom';
import cancelImg from '../assest/cancel.gif'
const PaymentCancel = () => {
  return (
      <div className="bg-slate-200 rounded-md my-4 min-h-[calc(100vh-160px)] mx-auto w-full max-w-md flex justify-center  items-center flex-col">
        <img  className="rounded-full" height={150} width={150} src={cancelImg} alt="cancelled" />
        <h1 className="text-red-500 font-bold text-xl">Payment Unsuccessful</h1>
        <Link to={'/cart'} className="p-2 px-5 mt-8 rounded font-semibold text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all">Go to cart</Link>
      </div>
    );
}

export default PaymentCancel