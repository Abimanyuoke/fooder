import bg from "../../../public/image/arabic_bg.jpg"
import Image from "next/image"
import Banner from "./Banner"
import People from "./People"
import App from "./AppStore"
import Testimonial from "./Testimonial"
import Footer from "./Footer"


export default function Profil () {
    return (
        <>
        <div className="bg-slate-900 overflow-x-hidden py-32">
            <Banner/>
            <People/>
            <Testimonial/>
            <App/>
            <Footer/>
            
        </div>
        </>
    )
}