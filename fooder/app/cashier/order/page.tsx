"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { IMenu } from "@/app/types";
import { getCookies } from "../../../lib/client-cookies";
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
import { get } from "../../../lib/bridge";
import { AlertInfo } from "@/components/alert";
import Image from "next/image";
import AddOrder from "./addOrder";

const TranskasiPage = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [menu, setMenu] = useState<IMenu[]>([]);
    const [loading, setLoading] = useState(true);
    const [orderQty, setOrderQty] = useState<{ [key: number]: number }>({}); // Menyimpan qty per menu ID

    // Fetch data menu
    const fetchMenu = async () => {
        try {
            const TOKEN = getCookies("token") || "";
            const url = `${BASE_API_URL}/menu?search=${search}`;
            const { data } = await get(url, TOKEN);
            if (data?.status) setMenu(data.data);
        } catch (error) {
            console.error("Error fetching menu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, [search]);

    // Menambah atau mengurangi jumlah item per menu
    const updateQty = (id: number, increment: boolean) => {
        setOrderQty((prevQty) => {
            const currentQty = prevQty[id] || 0;
            const newQty = increment ? currentQty + 1 : Math.max(0, currentQty - 1);
            return { ...prevQty, [id]: newQty };
        });
    };

    // Menghitung total transaksi
    const totalTransaction = menu.reduce((total, item) => {
        const qty = orderQty[item.id] || 0;
        return total + qty * item.price;
    }, 0);

    const category = (cat: string): React.ReactNode => {
        if (cat === "FOOD") {
            return <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Food</span>;
        }
        if (cat === "SNACK") {
            return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">Snack</span>;
        }
        return <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">Drink</span>;
    };

    const handleSubmitOrder = () => {
        const selectedOrders = Object.keys(orderQty)
            .filter((id) => orderQty[Number(id)] > 0)
            .map((id) => ({
                id: Number(id),
                qty: orderQty[Number(id)],
            }));

        if (selectedOrders.length === 0) {
            alert("Please add at least one menu item to the order.");
            return;
        }

        setShowOrderModal(true); // Buka modal AddOrder dan kirim orderLists
    };


    return (
        <div>
            <div className="mt-2 bg-slate-900 rounded-lg p-3 border-t-4 border-t-primary shadow-md">
                <h4 className="text-xl font-bold mb-2 text-white">Menu Data</h4>
                <p className="text-sm text-secondary mb-4">
                    This page displays menu data, allowing users to view details, search, and manage menu items by adding, editing, or deleting them.
                </p>
                {loading ? (
                    <p className="text-white">Loading...</p>
                ) : menu.length === 0 ? (
                    <AlertInfo title="Informasi">No data available</AlertInfo>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-2">
                            {menu.map((data) => (
                                <div key={data.id} className="shadow p-4 bg-gray-800 rounded-lg flex flex-col items-center text-center">
                                    <Image width={80} height={80} src={`${BASE_IMAGE_MENU}/${data.picture}`} className="rounded-sm overflow-hidden mb-2" alt="preview" unoptimized />
                                    <h5 className="text-white font-bold text-lg">{data.name}</h5>
                                    <p className="text-white text-sm">{data.description}</p>
                                    <span className="text-primary font-bold text-lg">{data.price}</span>
                                    <div className="mt-2">{category(data.category)}</div>
                                    <div className="flex items-center mt-3 space-x-3">
                                        <button
                                            className="bg-red-500 px-3 py-1 rounded text-white"
                                            onClick={() => updateQty(data.id, false)}
                                            disabled={orderQty[data.id] <= 0}
                                        >
                                            -
                                        </button>
                                        <span className="text-lg text-white">{orderQty[data.id] || 0}</span>
                                        <button
                                            className="bg-green-500 px-3 py-1 rounded text-white"
                                            onClick={() => updateQty(data.id, true)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 bg-gray-700 p-4 rounded-lg text-white text-center">
                            <h4 className="text-lg font-bold">Total Transaction</h4>
                            <p className="text-xl text-primary font-bold">Rp {totalTransaction.toLocaleString()}</p>
                            <button
                                className="bg-green-500 px-4 py-2 mt-3 rounded text-white font-bold"
                                onClick={handleSubmitOrder}
                            >
                                Submit Order
                            </button>
                        </div>

                    </div>
                )}
                {showOrderModal && <AddOrder orderLists={Object.entries(orderQty).map(([id, qty]) => ({ id: Number(id), qty }))}/>}

            </div>
        </div>
    );
};

export default TranskasiPage;











function setShowOrderModal(arg0: boolean) {
    throw new Error("Function not implemented.");
}
// "use client"

// import { useState } from 'react';
// import Image from 'next/image';
// import { transaksi } from '../../../data/transaksi';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AddOrder from './addOrder';

// // Define cart type
// type Cart = {
//     [key: number]: number; // key is the menu item ID, value is the quantity
// };

// export default function Order() {

//     const router = useRouter();
//     const searchParams = useSearchParams(); // Ambil search params dari URL
//     const category = searchParams.get('category'); // Ambil parameter 'category' dari URL

//     const filteredTransaksi = category
//         ? transaksi.filter(post => post.category.toLowerCase() === category.toLowerCase())
//         : transaksi;

//     const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const selectedCategory = event.target.value;
//         router.push(selectedCategory ? `/cashier/order?category=${selectedCategory}` : '/cashier/order');
//     };

//     const [cart, setCart] = useState<Cart>({}); // Explicitly set the type of cart

//     // Handle adding items to the cart
//     const handleAdd = (id: number) => {
//         setCart((prevCart) => ({
//             ...prevCart,
//             [id]: (prevCart[id] || 0) + 1,
//         }));
//     };

//     // Handle removing items from the cart
//     const handleRemove = (id: number) => {
//         setCart((prevCart) => {
//             const newCart = { ...prevCart };
//             if (newCart[id] > 1) {
//                 newCart[id] -= 1;
//             } else {
//                 delete newCart[id];
//             }
//             return newCart;
//         });
//     };

//     // Calculate total price
//     const totalPrice = Object.keys(cart).reduce((total, id) => {
//         const menuItem = filteredTransaksi.find((item) => item.id === parseInt(id));
//         return total + (menuItem?.price || 0) * cart[parseInt(id)];
//     }, 0);

//     return (
//         <div className="p-5 font-sans bg-slate-900 min-h-dvh text-primary">
//             <div className='text-center mb-20 max-w-[400px] mx-auto'>
//                 <p className='text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>Our Menu</p>
//                 <h1 className='text-3xl font-bold text-white'>Menu</h1>
//                 <p className='text-xs text-gray-400'>
//                     {" "}
//                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid ullam a nisi vero qui sed consequuntur iste cum minima error.
//                 </p>

//                 <div className="mt-4 mb-6 flex justify-center">
//                     <select
//                         name="category"
//                         value={category || ''}
//                         onChange={handleCategoryChange}
//                         className='p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600'
//                     >
//                         <option value="">All</option>
//                         <option value="makanan">Makanan</option>
//                         <option value="minuman">Minuman</option>
//                         <option value="dessert">Dessert</option>
//                     </select>
//                 </div>
//             </div>
//             <div className="flex justify-center">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-36">
//                     {filteredTransaksi.map((item) => (
//                         <div
//                             key={item.id}
//                             className="border border-gray-300 bg-slate-600/35 rounded-lg p-4 text-center w-[350px] shadow-sm hover:bg-primary hover:text-white transition-all duration-300">
//                             <Image
//                                 src={item.image}
//                                 alt={item.name}
//                                 width={500}
//                                 height={500}
//                                 className="object-cover rounded-lg mb-3" />
//                             <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
//                             <p className="mb-3">Rp {item.price.toLocaleString()}</p>
//                             <div className="flex items-center justify-center gap-3">
//                                 <button
//                                     onClick={() => handleRemove(item.id)}
//                                     className="bg-red-500 text-white px-3 py-1 rounded">
//                                     -
//                                 </button>
//                                 <span className="text-lg font-medium">{cart[item.id] || 0}</span>
//                                 <button
//                                     onClick={() => handleAdd(item.id)}
//                                     className="bg-green-500 text-white px-3 py-1 rounded">
//                                     +
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>


//             <div className="mt-10">
//                 <h2 className="text-xl font-bold mb-3 p-4 rounded-md shadow-sm shadow-slate-50">Detail Transaksi</h2>
//                 {Object.keys(cart).length > 0 ? (
//                     <div>
//                         <ul className="mb-5">
//                             {Object.keys(cart).map((id) => {
//                                 const menuItem = filteredTransaksi.find((item) => item.id === parseInt(id));
//                                 return (
//                                     <li key={id} className="flex justify-between mb-2 border-b-2 py-2 border-slate-500/20">
//                                         <span>{menuItem?.name} x {cart[parseInt(id)]}</span>
//                                         <span>Rp {(menuItem?.price || 0) * cart[parseInt(id)]}</span>
//                                     </li>
//                                 );
//                             })}
//                         </ul>
//                         <p className="text-lg font-semibold">Total: Rp {totalPrice.toLocaleString()}</p>
//                         <div className='flex items-center mt-8 space-x-8'>
//                             <AddOrder />
//                         </div>
//                     </div>
//                 ) : (
//                     <p className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-32 text-center font-semibold hover:translate-y-1 transition-all duration-300">Harus pesan dulu</p>
//                 )}
//             </div>
//         </div>
//     );
// }
