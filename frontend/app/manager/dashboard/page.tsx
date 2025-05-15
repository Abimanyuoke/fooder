"use client"

import React from 'react'
import Image from 'next/image';

import image1 from "../../../public/image/dashboard1.png";
import image2 from "../../../public/image/dashboard2.png";
import { FaBoxes, FaUser } from 'react-icons/fa';
import { FaBoxesPacking } from 'react-icons/fa6';
import { LuRefreshCw } from 'react-icons/lu';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { VscGraphLine } from 'react-icons/vsc';
import { BsFileEarmarkBarGraph } from 'react-icons/bs';
import SalesChart from '../../../components/graph';

const DashboardPage = () => {
    return (
        <div className='min-h-dvh bg-slate-900 p-12'>
            <div className='container w-full'>
                <div className='flex justify-center items-start space-x-4'>
                    <div>
                        <button className='flex space-x-4 text-white items-center pb-4'>
                            <LuRefreshCw className='text-3xl' />
                            <h3>Refresh Dashboard</h3>
                        </button>
                        <div className='flex justify-start items-center space-x-10'>
                            <div className='text-white flex flex-col justify-center items-center text-center bg-secondary rounded-md p-6  w-[270px] h-[230px]'>
                                <div className='flex flex-col  items-center space-y-4'>
                                    <FaUser className='text-3xl' />
                                    <p>Total Customer</p>
                                    <h1 className='text-2xl font-bold'>100</h1>
                                </div>
                            </div>
                            <div className='text-white flex flex-col justify-center items-center text-center bg-teal-600 rounded-md p-6  w-[270px] h-[230px]'>
                                <div className='flex flex-col  items-center space-y-4'>
                                    <FaBoxes className='text-4xl' />
                                    <p>Total Product</p>
                                    <h1 className='text-2xl font-bold'>150</h1>
                                </div>
                            </div>
                            <div className='text-white flex flex-col justify-center items-center text-center bg-purple-700 rounded-md p-6  w-[270px] h-[230px]'>
                                <div className='flex flex-col  items-center space-y-4'>
                                    <FaBoxesPacking className='text-4xl' />
                                    <p>Total Stok</p>
                                    <h1 className='text-2xl font-bold'>857</h1>
                                </div>
                            </div>
                        </div>
                        <div className='mt-8 p-4 bg-slate-800 w-[890px] h-[600px] rounded-md'>
                            <div className='space-x-4 text-white flex justify-center items-center'>
                                <BsFileEarmarkBarGraph className='text-3xl' />
                                <p className='text-xl font-semibold'>Grafik Nilai Transaksi Bulanan</p>
                            </div>
                            <SalesChart/>
                            <div className='flex justify-start items-center space-x-5'>
                                <div className='text-white flex flex-col justify-center items-center text-center rounded-md p-6  w-[270px] h-[230px]'>
                                    <div className='flex flex-col items-center space-y-4'>
                                        <p className='text-base'>Total Diskon</p>
                                        <h1 className='text-2xl bg-slate-300 rounded-md px-16 py-1 text-blue-500 font-bold'>3.650</h1>
                                    </div>
                                </div>
                                <div className='text-white flex flex-col justify-center items-center text-center rounded-md p-6  w-[270px] h-[230px]'>
                                    <div className='flex flex-col items-center space-y-4'>
                                        <p className='text-base'>Total Penjualan</p>
                                        <h1 className='text-2xl bg-slate-300 rounded-md px-16 py-1 text-blue-500 font-bold'>8.500.000</h1>
                                    </div>
                                </div>
                                <div className='text-white flex flex-col justify-center items-center text-center rounded-md p-6  w-[270px] h-[230px]'>
                                    <div className='flex flex-col items-center space-y-4'>
                                        <p className='text-base'>Total Produk Terjual</p>
                                        <h1 className='text-2xl bg-slate-300 rounded-md px-16 py-1 text-blue-500 font-bold'>48</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center pt-[46px]'>
                        <Image src={image2} width={400} alt='gambar grafik lingkaran kurir' className='bg-slate-700 rounded-md' />
                        <div className='space-y-4 pt-5'>
                            <div className='text-white flex flex-col justify-center items-center text-center rounded-md bg-slate-700 p-6 w-[400px] h-[239px]'>
                                <div className='flex flex-col items-center space-y-3'>
                                    <RiDiscountPercentFill className='text-5xl' />
                                    <p>Total Transaki Cash</p>
                                    <h1 className='font-bold text-2xl text-purple-300'>10.387.350</h1>
                                </div>
                            </div>
                            <div className='text-white flex flex-col justify-center items-center text-center rounded-md p-6 bg-slate-700 w-[400px] h-[238px]'>
                                <div className='flex flex-col  items-center space-y-3'>
                                    <VscGraphLine className='text-5xl' />
                                    <p>Total Transaksi Non-Tunai</p>
                                    <h1 className='font-bold text-2xl text-purple-300'>16.650</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default DashboardPage