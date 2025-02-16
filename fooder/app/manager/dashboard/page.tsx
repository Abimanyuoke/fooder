"use client"

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

import Food1 from "../../../public/image/menu/biryani1.png";
import Food2 from "../../../public/image/menu/biryani2.png";
import Food3 from "../../../public/image/menu/biryani3.png";

const ImageList = [
    {
        id: 1,
        img: Food1
    },
    {
        id: 2,
        img: Food2
    },
    {
        id: 3,
        img: Food3
    },
];



const DashboardPage = () => {
    const [imageId, setImageId] = React.useState(Food1);
    return (
        <div className='min-h-dvh bg-gray-900 text-white duration-200 flex justify-center items-center md:px-32'>
            <div className='container pb-8 sm:pb-0'>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                    {/* text content section  */}
                    <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1'>
                        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold'>
                            Welcome to the <span className='bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent'>Foodie</span> Zone
                        </h1>
                        <p className='text-sm '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quasi praesentium voluptatum aperiam laborum magni laudantium expedita, modi et velit.</p>
                        <div>
                            <button className='px-4 py-2 text-white bg-gradient-to-r from-primary to-secondary rounded-full hover:scale-105 duration-200'>
                                <Link href="/manager/menu">
                                    Order Now
                                </Link>
                            </button>
                        </div>
                    </div>
                    {/* Image section  */}
                    <div className='order-1 sm:order-2 min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative'>
                        {/* main image section */}
                        <div className='flex justify-center items-center h-[300px] sm:h-[450px] overflow-hidden'>
                            <Image src={imageId} alt="" className='w-[300px] sm:w-[450px] mx-auto spin' />
                        </div>
                        {/* image list section */}
                        <div className='flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute bottom-[0] lg:-right-10 bg-white/30 rounded-full'>
                            {
                                ImageList.map((item) => (
                                    <Image
                                        key={item.id} src={item.img} className='max-w-[80px] h-[80px] object-contain hover:scale-105 duration-200' onClick={() => {
                                            setImageId(
                                                item.id === 1 ? Food1 : item.id === 2 ? Food2 : Food3
                                            );
                                        }} alt={''} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashboardPage
