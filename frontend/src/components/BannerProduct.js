import React, { useEffect, useState } from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';

const BannerProduct = () => {
    const [currentImage,setCurrentImage] = useState(0);

    const desktopImages = [
        image1,image2,image3,image4,image5
    ]

    const mobileImages =[
        image1Mobile,image2Mobile,image3Mobile,image4Mobile,image5Mobile
    ]

    const nextImage = () => {
        setCurrentImage((currentImage + 1)%5);
    }
    
    const prevImage = () => {
        if(currentImage==0) {
            setCurrentImage(4)
        } else {
            setCurrentImage(currentImage - 1);
        }
    }

    useEffect(()=> {
        const interval = setTimeout(()=> {
            setCurrentImage((currentImage + 1) % 5);
        },3000);

        return () => clearInterval(interval);
    },[currentImage])

  return (
    <div className='container mx-auto px-4 rounded '>
        <div className='relative bg-white h-60 md:h-80 w-full overflow-hidden'>
            <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                <div className='w-full flex justify-between p-2'>
                    <button className='text-3xl bg-white p-1 shadow-md rounded-full' onClick={prevImage}><FaAngleLeft/></button>
                    <button className='text-3xl bg-white p-1 shadow-md rounded-full' onClick={nextImage}><FaAngleRight/></button>
                </div>
            </div>

            {/* Desktop and Tablet version */}
            <div className='hidden md:flex h-full w-full'>
                {
                    desktopImages.map((imageUrl,idx) => {
                        return (
                            <div key={idx+"bannerImage"} className='h-full w-full min-h-full min-w-full transition-all' style={{transform: `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageUrl} className='h-full w-full'/> 
                            </div>
                        )
                    })
                }
            </div>

            {/* Mobile Version */}
            <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                    desktopImages.map((imageUrl,idx) => {
                        return (
                            <div key={idx+"bannerImage"} 
                                className='h-full w-full min-h-full min-w-full transition-all' 
                                style={{transform: `translateX(-${currentImage * 100}%)`}}
                            >
                                <img src={imageUrl} className='h-full w-full'/> 
                            </div>
                        )
                    })
                }
            </div>

        </div>
    </div>
  )
}

export default BannerProduct;