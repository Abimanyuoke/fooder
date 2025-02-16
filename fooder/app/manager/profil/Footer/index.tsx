import Image from "next/image"
import bgChef from "../../../../public/image/chef.jpeg"
import { ReactNode } from "react";
import { FaFacebook, FaInstagram, FaLocationArrow, FaPhone } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";


interface icon {
    id: number;
    icon: ReactNode;
    desciption: string;
}

const item: icon[] = [
    {
        id: 1,
        icon: <FaPhone />,
        desciption: "+62 123-456-789"
    },
    {
        id: 2,
        icon: <MdEmail />,
        desciption: "fananiabimanyu@gmail.com"
    },
    {
        id: 3,
        icon: <FaLocationArrow/>,
        desciption: "SMK Telkom Malang"
    },
]

const socialMedia = [
    {
        id: 1,
        icon: <FaInstagram />,
        desciption: "fanani_abimanyu"
    },
    {
        id: 2,
        icon: <FaFacebook />,
        desciption: "Abimanyuoke"
    },
    {
        id: 3,
        icon: <FaLinkedin />,
        desciption: "fanani Akbar Abimanyu"
    },
]

export default function Footer() {
    return (
        <>
            <div className="py-32">
                <div className="container w-full space-x-16 grid grid-cols-2">
                    <Image
                        src={bgChef}
                        alt="chef"
                        className="mx-auto py-16 rounded" />

                    <div className="flex justify-center items-center space-x-16">
                        <div>
                            <h1 className="text-primary text-3xl font-bold">Kontak Kami</h1>
                            {
                                item.map((data) => {
                                    return (
                                        <div className="" key={data.id}>
                                            <div className="space-x-8 flex justify-start items-center py-8">
                                                <div className="text-2xl text-primary">{data.icon}</div>
                                                <p className="text-xl font-semibold text-secondary">{data.desciption}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div />
                        <div>
                            <h1 className="text-secondary text-3xl font-bold">Social Media</h1>
                            {
                                socialMedia.map((data) => {
                                    return (
                                        <div className="" key={data.id}>
                                            <div className="space-x-8 flex justify-start items-center py-8">
                                                <div className="text-2xl text-primary">{data.icon}</div>
                                                <p className="text-xl font-semibold text-secondary">{data.desciption}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}