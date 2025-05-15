"use client"

import { useRouter } from "next/navigation"
import { IOrder } from "../../../app/types"
import { BASE_API_URL } from "../../../global"
import { getCookies } from "../../../lib/client-cookies"
import { FormEvent, useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { ButtonWarning, ButtonDanger, ButtonSuccess } from "../../../components/button"
import Modal from "../../../components/modal"
import Select from "../../../components/select"

const EditOrder = ({ selectedOrder }: { selectedOrder: IOrder }) => {
    const router = useRouter()
    const [isShow, setIsShow] = useState<boolean>(false)
    const [order, setOrder] = useState<IOrder>({ ...selectedOrder })
    const TOKEN = getCookies("token") || ""
    const formRef = useRef<HTMLFormElement>(null)

    const openModal = () => {
        setOrder({ ...selectedOrder })
        setIsShow(true)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const url = `${BASE_API_URL}/order/${selectedOrder.id}`
            const { customer, table_number, payment_method, status, total_price } = order

            if (!customer || !table_number || !payment_method || !status) {
                toast("Please complete all fields.", {
                    hideProgressBar: true,
                    containerId: "toastOrder",
                    type: "warning",
                    autoClose: 2000,
                })
                return
            }

            if (isNaN(Number(total_price)) || total_price < 0) {
                toast("Please enter a valid total price.", {
                    hideProgressBar: true,
                    containerId: "toastOrder",
                    type: "warning",
                    autoClose: 2000,
                })
                return
            }

            const payload = {
                status
            }

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify(payload),
            })

            const data = await response.json()

            if (data?.status) {
                setIsShow(false)
                toast(data?.message || "Order updated successfully!", {
                    hideProgressBar: true,
                    containerId: "toastOrder",
                    type: "success",
                    autoClose: 2000,
                })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(data?.message || "Failed to update order.", {
                    hideProgressBar: true,
                    containerId: "toastOrder",
                    type: "warning",
                    autoClose: 2000,
                })
            }
        } catch (error) {
            console.error(error)
            toast("Something went wrong.", {
                hideProgressBar: true,
                containerId: "toastOrder",
                type: "error",
                autoClose: 2000,
            })
        }
    }

    return (
        <div>
            <ToastContainer containerId="toastOrder" />
            <ButtonWarning type="button" onClick={openModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </ButtonWarning>

            <Modal isShow={isShow} onClose={setIsShow}>
                <form onSubmit={handleSubmit} ref={formRef}>
                    {/* Modal header */}
                    <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
                        <div className="flex justify-between items-center">
                            <div>
                                <strong className="text-2xl text-black">Update Order</strong>
                                <p className="text-black text-sm">Modify your order information</p>
                            </div>
                            <button type="button" className="text-black" onClick={() => setIsShow(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Modal body */}
                    <div className="p-5 text-black">
                        <Select id="status" value={order.status} label="Status" required onChange={val => setOrder({ ...order, status: val })}>
                            <option value="">--- Select Status ---</option>
                            <option value="NEW">NEW</option>
                            <option value="PAID">PAID</option>
                            <option value="DONE">DONE</option>
                        </Select>
                    </div>

                    {/* Modal footer */}
                    <div className="flex justify-end gap-2 p-5">
                        <ButtonDanger type="button" onClick={() => setIsShow(false)}>Cancel</ButtonDanger>
                        <ButtonSuccess type="submit">Save</ButtonSuccess>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default EditOrder
