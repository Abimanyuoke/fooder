"use client";

import { IOrderList } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { post } from "@/lib/bridge";
import { getCookies } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ButtonPrimary, ButtonSuccess, ButtonDanger } from "@/components/button";
import { InputGroupComponent } from "@/components/InputComponent";
import Modal from "@/components/modal";

const AddOrderList = ({ cart }: { cart: { [key: number]: number } }) => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [orderlist, setOrderList] = useState<IOrderList>({
        id: 0, uuid: ``, quantity: 0, note: ``, createdAt: ``, updatedAt: ``, menuId: 0, orderId: 0
    });

    const router = useRouter();
    const TOKEN = getCookies("token") || "";
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const totalQuantity = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
        setOrderList((prev) => ({ ...prev, quantity: totalQuantity }));
    }, [cart]);

    const openModal = () => {
        setIsShow(true);
        if (formRef.current) formRef.current.reset();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const url = `${BASE_API_URL}/orderlist`;
            const { quantity, note, menuId, orderId } = orderlist;
            const payload = new FormData();
            payload.append("quantity", quantity.toString());
            payload.append("note", note || "");
            if (menuId) payload.append("menuId", menuId.toString());
            if (orderId) payload.append("orderId", orderId.toString());

            const { data } = await post(url, payload, TOKEN);
            if (data?.status) {
                setIsShow(false);
                toast(data?.message, { hideProgressBar: true, containerId: `toastOrderList`, type: `success` });
                setTimeout(() => router.refresh(), 1000);
            } else {
                toast(data?.message, { hideProgressBar: true, containerId: `toastOrderList`, type: `warning` });
            }
        } catch (error) {
            console.error(error);
            toast("Something went wrong", { hideProgressBar: true, containerId: `toastOrderList`, type: `error` });
        }
    };

    return (
        <div>
            <ToastContainer containerId={`toastOrderList`} />
            <ButtonSuccess type="button" onClick={openModal}>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add OrderList
                </div>
            </ButtonSuccess>
            <Modal isShow={isShow} onClose={state => setIsShow(state)}>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl text-black">Create OrderList</strong>
                                <small className="text-slate-400 text-sm">Chasier can create orderlist items on this page.</small>
                            </div>
                            <button type="button" className="ml-auto text-slate-400" onClick={() => setIsShow(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="p-5">
                        <InputGroupComponent id="quantity" type="number" value={orderlist.quantity.toString()}
                            onChange={val => setOrderList({ ...orderlist, quantity: Number(val) })}
                            required label="Quantity" className="text-black" />

                        <InputGroupComponent id="note" type="text" value={orderlist.note}
                            onChange={val => setOrderList({ ...orderlist, note: val })}
                            required label="Note" className="text-black" />

                        <InputGroupComponent id="menuId" type="number" value={(orderlist.menuId ?? 0).toString()}
                            onChange={val => setOrderList({ ...orderlist, menuId: Number(val) })}
                            required label="Menu ID" className="text-black" />

                        <InputGroupComponent id="orderId" type="number" value={(orderlist.orderId ?? 0).toString()}
                            onChange={val => setOrderList({ ...orderlist, orderId: Number(val) })}
                            required label="Order ID" className="text-black" />

                    </div>
                    <div className="w-full p-5 flex rounded-b-2xl shadow">
                        <div className="flex ml-auto gap-2">
                            <ButtonDanger type="button" onClick={() => setIsShow(false)}>
                                Cancel
                            </ButtonDanger>
                            <ButtonPrimary type="submit">
                                Checkout
                            </ButtonPrimary>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddOrderList;
