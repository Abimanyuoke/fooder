"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { IMenu } from "../../../app/types";
import { getCookies } from "../../../lib/client-cookies";
import { BASE_API_URL, BASE_IMAGE_MENU } from "../../../global";
import { get } from "../../../lib/bridge";
import { AlertInfo } from "../../../components/alert";
import Image from "next/image";
import AddOrder from "./addOrder";

const TranskasiPage = () => {

    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
    const [menu, setMenu] = useState<IMenu[]>([]);
    const [loading, setLoading] = useState(true);
    const [orderQty, setOrderQty] = useState<{ [key: number]: number }>({});

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

    const updateQty = (id: number, increment: boolean) => {
        setOrderQty((prevQty) => {
            const currentQty = prevQty[id] || 0;
            const newQty = increment ? currentQty + 1 : Math.max(0, currentQty - 1);
            return { ...prevQty, [id]: newQty };
        });
    };

    const totalTransaction = menu.reduce((total, item) => {
        const qty = orderQty[item.id] || 0;
        return total + qty * item.price;
    }, 0);

    const selectedOrders = Object.keys(orderQty)
        .filter((id) => orderQty[Number(id)] > 0)
        .map((id) => {
            const menuItem = menu.find((item) => item.id === Number(id));
            return {
                id: Number(id),
                name: menuItem?.name || "Unknown",
                qty: orderQty[Number(id)],
                price: menuItem?.price || 0,
            };
        });

    const category = (cat: string): React.ReactNode => {
        if (cat === "FOOD") {
            return <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Food</span>;
        }
        if (cat === "SNACK") {
            return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">Snack</span>;
        }
        return <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">Drink</span>;
    };

    return (
        <div>
            <div className="mt-2 bg-slate-900 rounded-lg p-3 border-t-4 border-t-primary shadow-md">
                <h4 className="text-xl font-bold mb-2 text-white">Menu Data</h4>
                {loading ? (
                    <p className="text-white">Loading...</p>
                ) : menu.length === 0 ? (
                    <AlertInfo title="Informasi">No data available</AlertInfo>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-2">
                            {menu.map((data) => (
                                <div key={data.id} className="shadow p-4 bg-gray-800 rounded-lg flex flex-col items-center text-center">
                                    <Image width={80} height={80} src={`${BASE_IMAGE_MENU}/${data.picture}`} className="rounded-sm mb-2" alt="preview" unoptimized />
                                    <h5 className="text-white font-bold text-lg">{data.name}</h5>
                                    <p className="text-white text-sm">{data.description}</p>
                                    <span className="text-primary font-bold">Rp {data.price.toLocaleString()}</span>
                                    <div className="mt-2">{category(data.category)}</div>
                                    <div className="flex flex-col items-center mt-3">
                                        <div className="flex items-center space-x-3">
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
                                </div>
                            ))}
                        </div>

                        {selectedOrders.length > 0 && (
                            <div className="mt-6 bg-gray-700 p-4 rounded-lg text-white">
                                <h4 className="text-lg font-bold">Transaction Details</h4>
                                <ul className="text-sm">
                                    {selectedOrders.map((order) => (
                                        <li key={order.id} className="flex justify-between border-b py-1">
                                            <span>{order.name} x {order.qty}</span>
                                            <span>Rp {(order.qty * order.price).toLocaleString()}</span>
                                        </li>
                                    ))}
                                </ul>
                                <h4 className="text-lg font-bold mt-3">Total: Rp {totalTransaction.toLocaleString()}</h4>

                                <div className="mt-4">
                                    <AddOrder orderLists={selectedOrders} />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TranskasiPage;




// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { IMenu } from "../../../app/types";
// import { getCookies } from "../../../lib/client-cookies";
// import { BASE_API_URL, BASE_IMAGE_MENU } from "../../../global";
// import { get } from "../../../lib/bridge";
// import { AlertInfo } from "../../../components/alert";
// import Image from "next/image";
// import AddOrder from "./addOrder";

// const TranskasiPage = () => {
//     const searchParams = useSearchParams();
//     const search = searchParams.get("search") || "";
//     const [showOrderModal, setShowOrderModal] = useState(false);
//     const [menu, setMenu] = useState<IMenu[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [orderQty, setOrderQty] = useState<{ [key: number]: number }>({});
//     const [orderConfirmed, setOrderConfirmed] = useState(false);

//     const fetchMenu = async () => {
//         try {
//             const TOKEN = getCookies("token") || "";
//             const url = `${BASE_API_URL}/menu?search=${search}`;
//             const { data } = await get(url, TOKEN);
//             if (data?.status) setMenu(data.data);
//         } catch (error) {
//             console.error("Error fetching menu:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchMenu();
//     }, [search]);

//     const updateQty = (id: number, increment: boolean) => {
//         setOrderQty((prevQty) => {
//             const currentQty = prevQty[id] || 0;
//             const newQty = increment ? currentQty + 1 : Math.max(0, currentQty - 1);
//             return { ...prevQty, [id]: newQty };
//         });
//     };

//     const totalTransaction = menu.reduce((total, item) => {
//         const qty = orderQty[item.id] || 0;
//         return total + qty * item.price;
//     }, 0);

//     const selectedOrders = Object.keys(orderQty)
//         .filter((id) => orderQty[Number(id)] > 0)
//         .map((id) => {
//             const menuItem = menu.find((item) => item.id === Number(id));
//             return {
//                 id: Number(id),
//                 name: menuItem?.name || "Unknown",
//                 qty: orderQty[Number(id)],
//                 price: menuItem?.price || 0,
//             };
//         });

//     const handleSubmitOrder = () => {
//         if (selectedOrders.length === 0) {
//             alert("Please add at least one menu item to the order.");
//             return;
//         }
//         setOrderConfirmed(true);
//         setShowOrderModal(true);
//     };

//     return (
//         <div>
//             <div className="mt-2 bg-slate-900 rounded-lg p-3 border-t-4 border-t-primary shadow-md">
//                 <h4 className="text-xl font-bold mb-2 text-white">Menu Data</h4>
//                 {loading ? (
//                     <p className="text-white">Loading...</p>
//                 ) : menu.length === 0 ? (
//                     <AlertInfo title="Informasi">No data available</AlertInfo>
//                 ) : (
//                     <>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-2">
//                             {menu.map((data) => (
//                                 <div key={data.id} className="shadow p-4 bg-gray-800 rounded-lg flex flex-col items-center text-center">
//                                     <Image width={80} height={80} src={`${BASE_IMAGE_MENU}/${data.picture}`} className="rounded-sm mb-2" alt="preview" unoptimized />
//                                     <h5 className="text-white font-bold">{data.name}</h5>
//                                     <span className="text-primary font-bold">Rp {data.price.toLocaleString()}</span>
//                                     <div className="flex flex-col items-center mt-3">
//                                         <div className="flex items-center space-x-3">
//                                             <button
//                                                 className="bg-red-500 px-3 py-1 rounded text-white"
//                                                 onClick={() => updateQty(data.id, false)}
//                                                 disabled={orderQty[data.id] <= 0}
//                                             >
//                                                 -
//                                             </button>
//                                             <span className="text-lg text-white">{orderQty[data.id] || 0}</span>
//                                             <button
//                                                 className="bg-green-500 px-3 py-1 rounded text-white"
//                                                 onClick={() => updateQty(data.id, true)}
//                                             >
//                                                 +
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {selectedOrders.length > 0 && (
//                             <div className="mt-6 bg-gray-700 p-4 rounded-lg text-white">
//                                 <h4 className="text-lg font-bold">Transaction Details</h4>
//                                 <ul className="text-sm">
//                                     {selectedOrders.map((order) => (
//                                         <li key={order.id} className="flex justify-between border-b py-1">
//                                             <span>{order.name} x {order.qty}</span>
//                                             <span>Rp {(order.qty * order.price).toLocaleString()}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                                 <h4 className="text-lg font-bold mt-3">Total: Rp {totalTransaction.toLocaleString()}</h4>
//                                 {!orderConfirmed ? (
//                                     <button
//                                         className="bg-green-500 px-4 py-2 mt-3 rounded text-white font-bold"
//                                         onClick={handleSubmitOrder}>
//                                         Submit Order
//                                     </button>
//                                 ) : (
//                                     <button onClick={() => setShowOrderModal(true)} className="mt-3">
//                                         {showOrderModal && <AddOrder orderLists={selectedOrders} />}
//                                     </button>
//                                 )}
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default TranskasiPage;