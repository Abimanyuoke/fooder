"use client"
import { ReactNode } from "react";
import Sidebar from "./sidebar";
import { SessionProvider } from "next-auth/react";

type MenuType = {
    id: string,
    icon: ReactNode
    path: string,
    label: string
}

type CashierProp = {
    children: ReactNode,
    id: string,
    title: string,
    menuList: MenuType[]
}

const CashierTemplate = ({ children, id, title, menuList }: CashierProp) => {
    return (
        <SessionProvider>
            <div className="w-full">
                <Sidebar menuList={menuList} title={title} id={id}>
                    {children}
                </Sidebar>
            </div>
        </SessionProvider>
    )
}


export default CashierTemplate
