import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct.js';
import displayCurrency from '../helpers/displayCurrency.js';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import addToCart from '../helpers/addToCart.js';
import Context from '../context/index.js';

const HorizontalCardProduct = ({category,heading}) => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);

    const loadingList = new Array(13).fill(null);
    const {fetchUserAddToCartCount} = useContext(Context);

    const scrollElement = useRef(0);
    const scrollRight = () => {
        scrollElement.current.scrollLeft += 1000;
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -=1000;
    }

    const handleAddToCart = async (e,id) => {
        await addToCart(e,id);
        await fetchUserAddToCartCount();
    };

    const fetchData = async () => {
        setLoading(true);
        try{
            const response = await fetchCategoryWiseProduct(category);
            setData(response.data.data);
            setLoading(false);
        } catch(err) {
            toast.error("Error in fetching data");
            // console.log(err)
        }
    }

    useEffect(() => {
        fetchData();
    },[]);

  return (
    <div className='container px-4 mx-auto my-4 relative'>

        <h2 className='text-2xl font-semibold py-2'>{heading}</h2>
        
        <div className='flex items-center gap-4 md:gap-6 overflow-x-auto scroll-none' ref={scrollElement}>

            <button className='absolute z-10 left-6 text-xl bg-white p-1 shadow-md rounded-full hidden md:block transition-transform' onClick={scrollLeft}><FaAngleLeft/></button>
            <button className='absolute z-10 right-6 text-xl bg-white p-1 shadow-md rounded-full hidden md:block transition-transform' onClick={scrollRight}><FaAngleRight/></button>

            {
                loading ? (
                    loadingList.map((product,idx) => {
                        return (
                            <div key={"loading"+idx} className='bg-white flex w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 shadow-md rounded-sm'>
                                <div className='bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                    <img className='h-full'/>
                                </div>
    
                                <div className="p-4 flex flex-col gap-3 relative w-full">
                                    <div className='w-full bg-slate-200 p-1 rounded-full animate-pulse'>
                                        <h2 className="p-1 w-full"></h2>
                                        {/* <h2 className='absolute z-10 -top-2 left-3 hidden text-slate-500 whitespace-nowrap px-2 py-1 group-hover:block overflow-visible'>{product?.productName}</h2> */}
                                    </div>
                                    <p className="w-full text-gray-500 bg-slate-200 p-1 py-2 rounded-full animate-pulse"></p>
    
                                    <div className="flex gap-2 w-full">
                                        <p className="w-full bg-slate-200 p-1 py-2 rounded-full animate-pulse"></p>
                                        <p className="w-full bg-slate-200 p-1 py-2 rounded-full animate-pulse"></p>
                                    </div>
    
                                    <div className="w-full mt-2  px-3 bg-slate-200 p-1 py-2 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data?.map((product,idx) => {
                        return (
                            <Link to={'/product/'+product?._id} key={product._id} className='bg-white flex w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 shadow-md rounded-sm'>
                                <div className='bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]'>
                                    <img src={product?.productImages[0]} className='h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply'/>
                                </div>
    
                                <div className="p-4 flex flex-col relative">
                                    <div className='group'>
                                        <h2 className="text-base md:text-lg font-medium text-ellipsis line-clamp-1">{product?.productName}</h2>
                                        {/* <h2 className='absolute z-10 -top-2 left-3 hidden text-slate-500 whitespace-nowrap px-2 py-1 group-hover:block overflow-visible'>{product?.productName}</h2> */}
                                    </div>
                                    <p className="capitalize text-gray-500">{product?.brandName}</p>
    
                                    <div className="flex gap-2">
                                        <p className="text-red-600 font-medium">{displayCurrency(product?.sellingPrice)}</p>
                                        <p className="text-slate-500 line-through">{displayCurrency(product?.price)}</p>
                                    </div>
    
                                    <button 
                                        className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full transition-all duration-300"
                                        onClick={(e) => handleAddToCart(e,product?._id)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </Link>
                        )
                    })
                )
            } 
        </div>
    </div>
  )
}

export default HorizontalCardProduct