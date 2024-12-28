import React, { useEffect, useState } from 'react';
import {toast}  from "react-toastify";
import axios from "axios";
import {Link} from "react-router-dom";
import Loading from './Loading';

const CategoryList = () => {
    const [categoryProduct,setCategoryProduct] = useState([]);
    const [loading,setLoading] = useState(true);
    const loadinglist = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        try{
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/get-CategoryProducts');
            const dataResponse = response.data.data;
            setCategoryProduct(dataResponse);
            setLoading(false);
        } catch(err) {
            console.log(err);
            setLoading(false);
            toast.error("Error Occured");
        }
    }

    useEffect(()=>{
        fetchCategoryProduct();
    },[]);

  return (
    <div className='container mx-auto p-4'>
        {
            loading ? (
                <div className='scroll-none flex items-center justify-between gap-4 overflow-scroll '>
                    {
                        loadinglist.map((product,index) => {
                            return (
                                <div  className='flex flex-col gap-2 animate-pulse' key={"loading"+index}>
                                    <div className='bg-slate-200 p-3 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full overflow-hidden'>
                                        <img className='h-full z-10' />
                                    </div>
                                    <p className='rounded-full py-2 p-1 bg-slate-200 animate-pulse'></p>
                                </div>
                            )
                        })
                    }
                </div>
            ) : (
                <div className='scroll-none flex items-center justify-between gap-4 overflow-scroll '>
                    {
                        categoryProduct.map((product,index) => {
                            return (
                                <Link to={'/category-product?category='+product?.category} className=' cursor-pointer' key={product?._id}>
                                    <div className='bg-white p-3 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full overflow-hidden'>
                                        <img className='h-full object-scale-down hover:scale-125 transition-all' src={product?.productImages[0]} alt={product?.category} />
                                    </div>
                                    <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                                </Link>
                            )
                        })
                    }
                </div>
            )
        }
    </div>
  )
}

export default CategoryList