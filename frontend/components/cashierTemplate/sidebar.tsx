"use client"

import { ReactNode, useState } from "react"
import Image from "next/image"
import MenuItem from "./menuItem"
import Logo from '../../public/image/restaurant.png'
import { getCookies, removeCookie, } from "../../lib/client-cookies"
import { useRouter } from "next/navigation";
import { BASE_IMAGE_PROFILE } from "../../global"
import { useSession } from "next-auth/react";


type MenuType = {
    id: string,
    icon: ReactNode
    path: string,
    label: string
}

type CahsierProp = {
    children: ReactNode,
    id: string,
    title: string,
    menuList: MenuType[]
}


const Sidebar = ({ children, id, title, menuList }: CahsierProp) => {
    const router = useRouter();
    const userName = getCookies("name") || "Guest";
    const profilePicture = getCookies("profile_picture");
    const [isShow, setIsShow] = useState(false)
    const role = getCookies(`role`)
    const [isDropdownOpen, setisDropdownOpen] = useState(false);
    const { data: session, status } = useSession();

    const handleLogout = () => {
        removeCookie("token")
        removeCookie("id")
        removeCookie("name")
        removeCookie("role")
        router.replace(`/login`)
    };

    return (
        <div className="w-full min-h-dvh">
            {/* header section */}
            <header className="flex justify-between items-center p-4 mb-0 bg-primary shadow-md">
                <div className="flex gap-2">
                    <button onClick={() => setIsShow(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </button>
                    <h1 className="font-bold text-xl text-black">
                        {title}
                    </h1>
                </div>


                <div className="relative">
                    <div className="flex items-center space-x-2 text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                        <button className="font-bold" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </header>
            {/* end header section */}

            {/* content section */}
            <div>
                {children}
            </div>
            {/* end content section */}

            {/* sidebar section */}
            <div className={`flex flex-col w-2/3 md:w-1/2 lg:w-1/4 h-full fixed top-0 right-full transition-transform z-50bg-white border-r border-primary bg-white ${isShow ? `translate-x-full` : ``}`}>

                {/* close button */}
                <div className="ml-auto p-2">
                    <button onClick={() => setIsShow(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
                {/* end close button */}

                {/* logo section */}
                <div className="mb-3 w-full flex justify-center">
                    <div className="flex items-center space-x-2">
                        <Image src={Logo} alt="Logo" width={40} height={40} />
                        <h1 className="text-2xl font-bold text-orange-500">Fooder</h1>
                    </div>
                </div>
                {/* end logo section */}

                {/* user section */}
                <div className="w-full mt-10 mb-6 bg-primary text-black p-3 flex gap-2 items-center">
                    {/* <img src={`${BASE_IMAGE_PROFILE}/${profilePicture}`} alt="Profile" width={100} height={100} className="rounded-full" /> */}
                    <img src={session?.user?.image ?? (profilePicture ? `${BASE_IMAGE_PROFILE}/${profilePicture}` : "/default-avatar.png")} alt="Profile" width={100} height={100} className="rounded-full" />
                    <div className="text-sm font-semibold">
                        <p className="text-sm font-semibold">{session?.user?.username ?? "Unknown"}</p>
                    </div>
                    <div className="bg-black px-2 py-3 rounded-lg">
                        <div className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent text-sm bg-clip-text font-medium">
                            {session?.user?.role ?? "Unknown"}
                        </div>
                    </div>
                </div>
                {/* end user section */}

                {/* menu section */}
                <div className="w-full p-2 overflow-y-auto">
                    <div className="px-5">
                        {
                            menuList.map((menu, index) => (
                                <MenuItem icon={menu.icon} label={menu.label} path={menu.path} active={menu.id === id} key={`keyMenu${index}`} />
                            ))
                        }
                    </div>
                </div>
                {/* menu section */}

            </div>
            {/* end sidebar section */}

        </div>
    )
}

export default Sidebar
