import { IUser } from "@/app/types";
import { getCookies } from "../../../lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { get } from "../../../lib/bridge";
import { AlertInfo } from "@/components/alert";
import Image from "next/image"
import Search from "./search";
import AddUser from "./addUser";
import EditUser from "./editUser";
import DeleteUser from "./deleteUser";

const getUser = async (search: string): Promise<IUser[]> => {
    try {
        const TOKEN = getCookies("token")
        const url = `${BASE_API_URL}/user?search=${search}`
        const { data } = await get(url, await TOKEN)
        let result: IUser[] = []
        if (data?.status) result = [...data.data]
        return result
    } catch (error) {
        console.log(error)
        return []
    }
}


const UserPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const search = searchParams.search ? searchParams.search.toString() : ``
    const user: IUser[] = await getUser(search)

    return (
        <div>
            <div className="mt-2 bg-slate-900 rounded-lg p-3 border-t-4 border-t-primary shadow-md">
                <h4 className="text-xl font-bold mb-2 text-white">User Data</h4>
                <p className="text-sm text-secondary mb-4">
                    This page displays menu data, allowing menus to view details,
                    search, and manage menu items by adding, editing, or deleting them.
                </p>
                <div className="flex justify-between items-center mb-4">
                    {/* Search Bar */}
                    <div className="flex items-center w-full max-w-md flex-grow">
                        <Search url={`/manager/user`} search={search} />
                    </div>
                    {/* Add Menu Button */}
                    <div className="ml-4">
                        <AddUser />
                    </div>
                </div>
                {
                    user.length == 0 ?
                        <AlertInfo title="informasi">
                            No data Available
                        </AlertInfo>
                        :
                        <div className="m-2">
                            {user.map((data, index) => (
                                <div key={`keyPrestasi${index}`} className={`flex flex-wrap shadow m-2`}>
                                    <div className="w-full md:w-1/12 p-2 text-white">
                                        <small className="text-sm font-bold text-primary">Picture</small><br />
                                        <Image width={40} height={40} src={`${BASE_IMAGE_PROFILE}/${data.profile_picture}`} className="rounded-full overflow-hidden" alt="preview" unoptimized />
                                    </div>
                                    <div className="w-full md:w-2/12 p-2 text-white">
                                        <small className="text-sm font-bold text-primary">Name</small> <br />
                                        {data.name}
                                    </div>
                                    <div className="w-full md:w-1/12 p-2 text-white">
                                        <small className="text-sm font-bold text-primary">Email</small> <br />
                                        {data.email}
                                    </div>
                                    <div className="w-full md:w-5/12 px-36 p-2 text-white">
                                        <small className="text-sm font-bold text-primary">Role</small> <br />
                                        {data.role}
                                    </div>
                                    <div className="w-full md:w-2/12 p-2 text-white">
                                        <small className="text-sm font-bold text-primary">Action</small><br />
                                        <div className="flex gap-1">
                                            <EditUser selectedUser={data} />
                                            <DeleteUser selectedUser={data} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                }

            </div>
        </div>
    )
}
export default UserPage





// 'use client';

// import Image from 'next/image'
// import { useRouter, useSearchParams } from 'next/navigation';
// import { menu } from '../../../data/menu';

// const DashboardPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const category = searchParams.get('category');

//   const filteredMenu = category
//     ? menu.filter(post => post.category.toLowerCase() === category.toLowerCase())
//     : menu;

//   const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedCategory = event.target.value;
//     router.push(selectedCategory ? `/manager/menu?category=${selectedCategory}` : '/manager/menu');
//   };

//   return (
//     <div className='py-10 dark:bg-slate-900 dark:text-white min-h-dvh'>
//       <div className='container'>
//         {/* Header section */}
//         <div className='text-center mb-20 max-w-[400px] mx-auto'>
//           <p className='text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>Our Menu</p>
//           <h1 className='text-3xl font-bold'>Menu</h1>
//           <p className='text-xs text-gray-400'>
//             {" "}
//             Lorem our adipisicing elit. Aliquid ullam a nisi vero qui sed consequuntur iste cum minima error.
//           </p>
//           <div className="mt-4 mb-6 flex justify-center space-x-4 text-primary">
//             <select
//               name="category"
//               value={category || ''}
//               onChange={handleCategoryChange}
//               className='p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600'
//             >
//               <option value="">All</option>
//               <option value="makanan">Makanan</option>
//               <option value="minuman">Minuman</option>
//               <option value="dessert">Dessert</option>
//             </select>
//           </div>
//         </div>
//         {/* Card section */}
//         <div>
//           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 place-items-center py-16'>
//             {
//               filteredMenu.map(({ id, img, name, deskripsi }) => {
//                 return (
//                   <div key={id} className='max-w-[300px] group rounded-2xl bg-white dark:bg-gray-800 dark:text-white  hover:bg-primary hover:text-white duration-300 p-4 shadow-xl'>
//                     <div className='h-[120px]'>
//                       <Image src={img} alt="" className='max-w-[200px] mx-auto block transform -translate-y-14 group-hover:scale-105 group-hover:rotate-6 duration-300' />
//                     </div>
//                     <div className='p-4 text-center'>
//                       <h1 className='text-xl font-bold'>{name}</h1>
//                       <p className='text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2'>{deskripsi}</p>
//                     </div>
//                   </div>
//                 )
//               })
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DashboardPage;
















// "use client"

// import { useState } from "react";
// import { FaStar } from "react-icons/fa";
// import img1 from "@/public/image/user/shincan.png"
// import img2 from "@/public/image/user/shincan2.png"
// import img3 from "@/public/image/user/shincan3.jpg"
// import Image from "next/image";

// interface Testimonial {
//     id: number;
//     name: string;
//     role: string;
//     text: string;
//     rating: number;
//     img: any;
// }

// const DashboardPage = () => {
//     const [testimonials, setTestimonials] = useState<Testimonial[]>([
//         {
//             id: 1,
//             name: "Saul Goodman",
//             role: "CEO & Founder",
//             text: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
//             rating: 5,
//             img: img1
//         },
//         {
//             id: 2,
//             name: "Saul Goodman",
//             role: "CEO & Founder",
//             text: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
//             rating: 5,
//             img: img2
//         },
//         {
//             id: 3,
//             name: "Saul Goodman",
//             role: "CEO & Founder",
//             text: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
//             rating: 5,
//             img: img3
//         },
//     ]);
//     const [editingId, setEditingId] = useState<number | null>(null);
//     const [newText, setNewText] = useState<string>("");

//     const handleEdit = (testimonial: Testimonial) => {
//         setEditingId(testimonial.id);
//         setNewText(testimonial.text);
//     };

//     const handleSave = (id: number) => {
//         setTestimonials(
//             testimonials.map((t) => (t.id === id ? { ...t, text: newText } : t))
//         );
//         setEditingId(null);
//     };

//     const handleDelete = (id: number) => {
//         setTestimonials(testimonials.filter((t) => t.id !== id));
//     };

//     return (
//         <div className="container">
//             <div className="flex flex-col items-center min-h-screen bg-slate-900 p-4 space-y-8">
//                 <h2 className="text-white text-sm uppercase font-medium font-roboto">Testimonials</h2>
//                 <h1 className="mb-4 text-white text-5xl font-semibold">
//                     What Are They <span className="text-red-500 font-amatic font-semibold">Saying About Us</span>
//                 </h1>
//                 {testimonials.map((testimonial) => (
//                     <div key={testimonial.id} className="bg-white p-6 shadow-lg rounded-lg w-2/3 flex items-center space-x-4">
//                         <div className="w-3/4">
//                             {editingId === testimonial.id ? (
//                                 <textarea
//                                     className="border p-2 w-full rounded"
//                                     value={newText}
//                                     onChange={(e) => setNewText(e.target.value)}
//                                 />
//                             ) : (
//                                 <p className="italic text-gray-600">{testimonial.text}</p>
//                             )}
//                             <h3 className="mt-2 font-bold text-gray-800">{testimonial.name}</h3>
//                             <p className="text-gray-500 text-sm">{testimonial.role}</p>
//                             <div className="flex text-yellow-500 mt-2">
//                                 {[...Array(testimonial.rating)].map((_, i) => (
//                                     <FaStar key={i} />
//                                 ))}
//                             </div>
//                             <div className="mt-3 space-x-2">
//                                 {editingId === testimonial.id ? (
//                                     <button
//                                         onClick={() => handleSave(testimonial.id)}
//                                         className="bg-green-500 text-white px-3 py-1 rounded"
//                                     >
//                                         Save
//                                     </button>
//                                 ) : (
//                                     <button
//                                         onClick={() => handleEdit(testimonial)}
//                                         className="bg-blue-500 text-white px-3 py-1 rounded"
//                                     >
//                                         Edit
//                                     </button>
//                                 )}
//                                 <button
//                                     onClick={() => handleDelete(testimonial.id)}
//                                     className="bg-red-500 text-white px-3 py-1 rounded"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="w-1/4">
//                             <Image
//                                 src={testimonial.img}
//                                 alt="User"
//                                 className="rounded-full bg-cover"
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
// export default DashboardPage;
