"use client"

import React, { ReactNode } from 'react'
import Image from 'next/image';
import Link from 'next/link';

import Food1 from "../../../public/image/menu/biryani1.png";
import Food2 from "../../../public/image/menu/biryani2.png";
import Food3 from "../../../public/image/menu/biryani3.png";
import { VscGraph } from 'react-icons/vsc';
import { IoDiamondOutline } from 'react-icons/io5';
import { SlDrawer } from 'react-icons/sl';
import { IoIosArrowForward } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';
import about from "@/public/image/about.jpg"
import about2 from "@/public/image/about-2.jpg"
import { FaCirclePlay } from 'react-icons/fa6';

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


interface data {
    id: number;
    icon: ReactNode;
    title: string
    sub: string
}

const item: data[] = [
    {
        id: 1,
        icon: <VscGraph />,
        title: "Corporis voluptates officia eiusmod",
        sub: "Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip"
    },
    {
        id: 2,
        icon: <IoDiamondOutline />,
        title: "Corporis voluptates officia eiusmod",
        sub: "Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip"
    },
    {
        id: 3,
        icon: <SlDrawer />,
        title: "Corporis voluptates officia eiusmod",
        sub: "Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip"
    },
]


const DashboardPage = () => {
    const [imageId, setImageId] = React.useState(Food1);
    return (
        <div className='min-h-dvh bg-gray-900 text-white duration-200 space-y-20'>
            <div className='flex justify-center items-center md:px-32 pt-32'>
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

            <div>
                <div className="py-8">
                    <div className="flex justify-center">
                        <div className="px-28 space-y-8">
                            <Image
                                src={about}
                                alt="gambar about"
                                width={700} />
                            <div className="font-roboto border-2 border-abu text-center">
                                <div className="py-3">
                                    <h1 className="font-bold text-abu">Book a Table</h1>
                                    <h1 className="text-primary font-semibold">+1 5589 55488 55</h1>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <i className="text-abu inline-block w-[470px]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </i>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                    <FaCheckCircle className="text-primary text-lg" />
                                    <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaCheckCircle className="text-primary text-lg" />
                                    <p>Duis aute irure dolor in reprehenderit in voluptate velit.</p>
                                </div>
                                <div className="flex space-x-3">
                                    <FaCheckCircle className="text-primary text-lg" />
                                    <p className="w-[470px]">Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</p>
                                </div>
                            </div>
                            <p className="w-[450px]">Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident</p>
                            <div className="relative">
                                <Image
                                    src={about2}
                                    alt="about2"
                                    width={410} />
                                <div>
                                    <FaCirclePlay className="text-primary text-5xl absolute top-1/2 left-48 hover:text-white duration-300 ease-in-out transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8 bg-background2 w-full">
                <div className="flex justify-center">
                    <div className="flex bg-secondary text-white font-roboto p-8 w-[400px] mr-5">
                        <div className="space-y-6">
                            <div className="space-y-6">
                                <h1 className="font-bold text-4xl">Why Choose Yummy</h1>
                                <p className="font-normal text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit Asperiores dolores sed et. Tenetur quia eos. Autem tempore quibusdam vel necessitatibus optio ad corporis</p>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="flex space-x-3 justify-center items-center bg-background2/50  py-2 w-[200px] rounded-full">
                                    <button className="text-base font-normal">Learn More</button>
                                    <IoIosArrowForward />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        {
                            item.map((items) => {
                                return (
                                    <div key={items.id} className="font-roboto bg-slate-700 p-12 w-[250px] h-[400px]">
                                        <div className="space-y-6">
                                            <div className="flex justify-center items-center">
                                                <div className="flex justify-center items-center bg-primary/30 p-9 rounded-full text-primary w-[20px] h-[20px]  hover:bg-primary hover:text-white duration-300 transition-all ease-in-out">
                                                    <div className="font-semibold text-2xl">{items.icon}</div>
                                                </div>
                                            </div>
                                            <h1 className="font-medium text-xl text-abu">{items.title}</h1>
                                            <p className="font-normal text-sm text-abu">{items.sub}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>







    )
}
export default DashboardPage
