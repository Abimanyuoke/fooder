"use client"

import { IOrder } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { post } from "@/lib/bridge"
import { getCookies } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { ButtonPrimary, ButtonSuccess, ButtonDanger } from "@/components/button"
import { InputGroupComponent } from "@/components/InputComponent"
import Modal from "@/components/modal"
import Select from "@/components/select"

const AddOrder = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [order, setOrder] = useState<IOrder>({
        id: 0, uuid: ``, customer: ``, table_number: ``, total_price: 0,
        payment_method: ``, status: ``, createdAt: ``, updatedAt: ``, userId: 0, orderLists: [],
    })
    const router = useRouter()
    const TOKEN = getCookies("token") || ""
    const formRef = useRef<HTMLFormElement>(null)
    const openModal = () => {
        setOrder({
            id: 0, uuid: ``, customer: ``, table_number: ``, total_price: 0,
            payment_method: ``, status: ``, createdAt: ``, updatedAt: ``, userId: 0, orderLists: [],
        })
        setIsShow(true)
        if (formRef.current) formRef.current.reset()
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/order`
            const { customer, table_number, payment_method, status, orderLists } = order
            const userId = getCookies("userId") || "";

            const formData = new FormData();
            formData.append("customer", customer);
            formData.append("table_number", table_number.toString());
            formData.append("payment_method", payment_method);
            formData.append("status", status);
            formData.append("userId", userId.toString());
            formData.append("orderlists", JSON.stringify(orderLists));

            const { data } = await post(url, formData, TOKEN)
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, { hideProgressBar: true, containerId: `toastOrder`, type: `success` })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(data?.message, { hideProgressBar: true, containerId: `toastOrder`, type: `warning` })
            }
        } catch (error) {
            console.log(error);
            toast(`Something Wrong`, { hideProgressBar: true, containerId: `toastOrder`, type: `error` })
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastOrder`} />
            <ButtonSuccess type="button" onClick={() => openModal()}>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Order
                </div>
            </ButtonSuccess>
            <Modal isShow={isShow} onClose={state => setIsShow(state)}>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl text-black">Create Order</strong>
                                <small className="text-slate-400 text-sm">Cashier can create order items on this page.</small>
                            </div>
                            <div className="ml-auto">
                                <button type="button" className="text-slate-400" onClick={() => setIsShow(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="p-5">
                        <InputGroupComponent id={`customer`} type="text" value={order.customer}
                            onChange={val => setOrder({ ...order, customer: val })}
                            required={true} label="Customer" className="text-black" />

                        <InputGroupComponent id={`table_number`} type="text" value={order.table_number}
                            onChange={val => setOrder({ ...order, table_number: val })}
                            required={true} label="Table" className="text-black" />

                        <Select id={`payment_method`} value={order.payment_method} label="Payment Method"
                            required={true} onChange={val => setOrder({ ...order, payment_method: val })} className="text-black">
                            <option value="">--- Select Payment ---</option>
                            <option value="CASH">CASH</option>
                            <option value="QRIS">QRIS</option>
                        </Select>

                        <Select id={`status`} value={order.status} label="Status Method"
                            required={true} onChange={val => setOrder({ ...order, status: val })} className="text-black">
                            <option value="">--- Select Status ---</option>
                            <option value="NEW">NEW</option>
                            <option value="PAID">PAID</option>
                            <option value="DONE">DONE</option>
                        </Select>
                    </div>
                    <div className="w-full p-5 flex rounded-b-2xl shadow">
                        <div className="flex ml-auto gap-2">
                            <ButtonDanger type="button" onClick={() => setIsShow(false)}>
                                Cancel
                            </ButtonDanger>
                            <ButtonPrimary type="submit">
                                Save
                            </ButtonPrimary>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddOrder;




// "use client"

// import { IOrder } from "@/app/types"
// import { BASE_API_URL } from "@/global"
// import { post } from "@/lib/bridge"
// import { getCookies } from "@/lib/client-cookies"
// import { useRouter } from "next/navigation"
// import { FormEvent, useRef, useState } from "react"
// import { toast, ToastContainer } from "react-toastify"
// import { ButtonPrimary, ButtonSuccess, ButtonDanger } from "@/components/button"
// import { InputGroupComponent } from "@/components/InputComponent"
// import Modal from "@/components/modal"
// import Select from "@/components/select"


// const AddOrder = () => {

//     const [isShow, setIsShow] = useState<boolean>(false)
//     const [order, setOrder] = useState<IOrder>({
//         id: 0, uuid: ``, customer: ``, table_number: ``, total_price: 0,
//         payment_method: ``, status: ``, createdAt: ``, updatedAt: ``, userId: 0, orderLists: [],
//     })
//     const router = useRouter()
//     const TOKEN = getCookies("token") || ""
//     const formRef = useRef<HTMLFormElement>(null)
//     const openModal = () => {
//         setOrder({
//             id: 0, uuid: ``, customer: ``, table_number: ``, total_price: 0,
//             payment_method: ``, status: ``, createdAt: ``, updatedAt: ``, userId: 0, orderLists: [],
//         })
//         setIsShow(true)
//         if (formRef.current) formRef.current.reset()
//     }

//     // useEffect(() => {
//     //     setOrder(prevOrder => ({ ...prevOrder, total_price: totalPrice }));
//     // }, [totalPrice]);

//     const handleSubmit = async (e: FormEvent) => {
//         try {
//             e.preventDefault()
//             const url = `${BASE_API_URL}/order`
//             const { customer, table_number, total_price, payment_method, status } = order
//             const payload = new FormData()
//             // const userId = getCookies("userId") || "";
//             payload.append("customer", customer || "")
//             payload.append("table_number", table_number !== undefined ? table_number.toString() : "0");
//             payload.append("total_price", total_price !== undefined ? total_price.toString() : "0");
//             payload.append("payment_method", payment_method || "")
//             payload.append("status", status || "")
//             // payload.append("userId", userId);

//             const { data } = await post(url, payload, TOKEN)
//             if (data?.status) {
//                 setIsShow(false)
//                 toast(data?.message, { hideProgressBar: true, containerId: `toastOrder`, type: `success` })
//                 setTimeout(() => router.refresh(), 1000)
//             } else {
//                 toast(data?.message, { hideProgressBar: true, containerId: `toastOrder`, type: `warning` })
//             }
//         } catch (error) {
//             console.log(error);
//             toast(`Something Wrong`, { hideProgressBar: true, containerId: `toastOrder`, type: `error` })
//         }
//     }

//     return (
//         <div>
//             <ToastContainer containerId={`toastOrder`} />
//             <ButtonSuccess type="button" onClick={() => openModal()}>
//                 <div className="flex items-center gap-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                     </svg>
//                     Add Order
//                 </div>
//             </ButtonSuccess>
//             <Modal isShow={isShow} onClose={state => setIsShow(state)}>
//                 <form onSubmit={handleSubmit}>
//                     {/* modal header */}
//                     <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
//                         <div className="w-full flex items-center">
//                             <div className="flex flex-col">
//                                 <strong className="font-bold text-2xl text-black">Create Order</strong>
//                                 <small className="text-slate-400 text-sm">Chasier can create order items on this page.</small>
//                             </div>
//                             <div className="ml-auto">
//                                 <button type="button" className="text-slate-400" onClick={() => setIsShow(false)}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                     {/* end modal header */}

//                     {/* modal body */}
//                     <div className="p-5">
//                         <InputGroupComponent id={`customer`} type="text" value={order.customer}
//                             onChange={val => setOrder({ ...order, customer: val })}
//                             required={true} label="Customer" className="text-black" />

//                         <InputGroupComponent id={`table_number`} type="text" value={order.table_number}
//                             onChange={val => setOrder({ ...order, table_number: val })}
//                             required={true} label="Table" className="text-black" />

//                         <InputGroupComponent id={`total_price`} type="number" value={order.total_price.toString()}
//                             onChange={val => setOrder({ ...order, total_price: Number(val) })}
//                             required={true} label="Total Price" className="text-black" />

//                         <Select id={`payment_method`} value={order.payment_method} label="Payment Method"
//                             required={true} onChange={val => setOrder({ ...order, payment_method: val })} className="text-black">
//                             <option value="">--- Select Payment ---</option>
//                             <option value="CASH">CASH</option>
//                             <option value="QRIS">QRIS</option>
//                         </Select>

//                         <Select id={`status`} value={order.status} label="Status Method"
//                             required={true} onChange={val => setOrder({ ...order, status: val })} className="text-black">
//                             <option value="">--- Select Status ---</option>
//                             <option value="NEW">NEW</option>
//                             <option value="PAID">PAID</option>
//                             <option value="DONE">DONE</option>
//                         </Select>

//                     </div>
//                     {/* end modal body */}

//                     {/* modal footer */}
//                     <div className="w-full p-5 flex rounded-b-2xl shadow">
//                         <div className="flex ml-auto gap-2">
//                             <ButtonDanger type="button" onClick={() => setIsShow(false)}>
//                                 Cancel
//                             </ButtonDanger>
//                             <ButtonPrimary type="submit">
//                                 Save
//                             </ButtonPrimary>
//                         </div>
//                     </div>
//                     {/* end modal footer */}
//                 </form>
//             </Modal>
//         </div>
//     )


// }
// export default AddOrder; 