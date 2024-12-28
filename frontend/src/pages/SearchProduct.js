import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from "axios";
import QueryProducts from '../components/QueryProducts';

const SearchProduct = () => {
    const [queryData,setQueryData] = useState([]);
    const [loading,setLoading] = useState(true);
    const query = useLocation();

    const fetchSearchProduct = async () => {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/search"+query.search)
        const dataResponse = response.data;

        if(dataResponse.success) {
            setQueryData(dataResponse.data);
        }

        if(dataResponse.error) {
            console.log("Error in queryData:",dataResponse.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchSearchProduct();
    },[query]);

  return (
    <div className='container mx-auto p-4'>
        {
            loading && (
                <div className='h-[calc(100vh-155px)] w-full max-w-full flex items-center justify-center'>
                    <p className='text-4xl  text-center w-full animate-pulse transition-all'>Loading....</p>
                </div>
            )
        }
        
        <p className='text-lg font-semibold my-3'>Search Results : {queryData.length}</p>
        {
            queryData.length===0 && !loading && (
                <div className='bg-white text-lg p-4 text-center'>
                    <p className=''>No data found</p>
                </div>
            )
        }

        {
            queryData.length!==0 && !loading && (
                <QueryProducts loading={loading} data={queryData} />
            )
        }
    </div>
  )
}

export default SearchProduct