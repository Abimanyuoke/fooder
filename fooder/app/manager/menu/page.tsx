import { IMenu } from "@/app/types";
import { getCookies } from "../../../lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
import { get } from "../../../lib/bridge";
import { AlertInfo } from "@/components/alert";
import Image from "next/image"
import Search from "./search";
import AddMenu from "./addMenu";
import EditMenu from "./editMenu";
import DeleteMenu from "./deleteMenu";

const getMenu = async (search: string): Promise<IMenu[]> => {
  try {
    const TOKEN = await getCookies("token")
    const url = `${BASE_API_URL}/menu?search=${search}`
    const { data } = await get(url, TOKEN)
    let result: IMenu[] = []
    if (data?.status) result = [...data.data]
    return result
  } catch (error) {
    console.log(error)
    return []
  }
}


const MenuPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const search = searchParams.search ? searchParams.search.toString() : ``
  const menu: IMenu[] = await getMenu(search)

  const category = (cat: string): React.ReactNode => {
    if (cat === "FOOD") {
      return <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
        Food
      </span>
    }
    if (cat === "SNACK") {
      return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
        Snack
      </span>
    }
    return <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
      Drink
    </span>
  }

  return (
    <div>
      <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
        <h4 className="text-xl font-bold mb-2">Menu Data</h4>
        <p className="text-sm text-secondary mb-4">
          This page displays menu data, allowing menus to view details,
          search, and manage menu items by adding, editing, or deleting them.
        </p>
        <div className="flex justify-between items-center mb-4">
          {/* Search Bar */}
          <div className="flex items-center w-full max-w-md flex-grow">
            <Search url={`/manager/menu`} search={search} />
          </div>
          {/* Add Menu Button */}
          <div className="ml-4">
              <AddMenu/>
          </div>
        </div>
        {
          menu.length == 0 ?
            <AlertInfo title="informasi">
              No data Available
            </AlertInfo>
            :
            <>
              <div className="m-2">
                {menu.map((data, index) => (
                  <div key={`keyPrestasi${index}`} className={`flex flex-wrap shadow m-2`}>
                    <div className="w-full md:w-1/12 p-2">
                      <small className="text-sm font-bold text-primary">Picture</small><br />
                      <Image width={40} height={40} src={`${BASE_IMAGE_MENU}/${data.picture}`} className="rounded-sm overflow-hidden" alt="preview" unoptimized />
                    </div>
                    <div className="w-full md:w-2/12 p-2">
                      <small className="text-sm font-bold text-primary">Name</small> <br />
                      {data.name}
                    </div>
                    <div className="w-full md:w-1/12 p-2">
                      <small className="text-sm font-bold text-primary">Price</small> <br />
                      {data.price}
                    </div>
                    <div className="w-full md:w-5/12 p-2">
                      <small className="text-sm font-bold text-primary">Description</small> <br />
                      {data.description}
                    </div>
                    <div className="w-full md:w-1/12 p-2">
                      <small className="text-sm font-bold text-primary">Category</small> <br />
                      {category(data.category)}
                    </div>
                    <div className="w-full md:w-2/12 p-2">
                      <small className="text-sm font-bold text-primary">Action</small><br />
                      <div className="flex gap-1">
                        <EditMenu selectedMenu={data}/>
                        <DeleteMenu selectedMenu={data}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
        }

      </div>
    </div>
  )
}
export default MenuPage





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
