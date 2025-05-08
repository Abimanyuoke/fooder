import { IMenu } from "@/app/types";
import { getCookies } from "@/lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
import { get } from "@/lib/bridge";
import Image from 'next/image';
import Link from "next/link";

// Match exactly with your Prisma enum
type MenuCategory = 'FOOD' | 'DRINK' | 'SNACK';

const getMenu = async (search: string, category: string): Promise<IMenu[]> => {
    try {
        const TOKEN = await getCookies("token");
        let url = `${BASE_API_URL}/menu?search=${encodeURIComponent(search)}`;
        
        // Only add category if it's a valid enum value
        if (category && category !== "ALL" && ['FOOD', 'DRINK', 'SNACK'].includes(category)) {
            url += `&category=${category}`;
        }
        
        const { data } = await get(url, TOKEN);
        return data?.status ? [...data.data] : [];
    } catch (error) {
        console.error("Error fetching menu:", error);
        return [];
    }
};

const MenuPage = async ({ 
    searchParams 
}: { 
    searchParams: { 
        search?: string | string[];
        category?: string | string[];
    } 
}) => {
    // Properly await and type the searchParams
    const search = Array.isArray(searchParams.search) 
        ? searchParams.search[0] || ''
        : searchParams.search || '';

    const categoryParam = Array.isArray(searchParams.category) 
        ? searchParams.category[0] || ''
        : searchParams.category || '';
    
    // Validate against Prisma enum values
    const validCategories: MenuCategory[] = ['FOOD', 'DRINK', 'SNACK'];
    const category = validCategories.includes(categoryParam as MenuCategory) 
        ? categoryParam 
        : 'ALL';

    const menu = await getMenu(search, category === 'ALL' ? '' : category);

    return (
        <div className='py-10 dark:bg-slate-900 dark:text-white min-h-dvh'>
            <div className='container'>
                <div className='text-center mb-20 max-w-[400px] mx-auto font-Lilita_One'>
                    <p className='text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
                        Our Menu
                    </p>
                    <h1 className='text-3xl font-bold'>Menu</h1>
                    <p className='text-xs text-gray-400'>
                        Choose from our delicious selection
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex justify-center gap-4 my-8 flex-wrap">
                    {['ALL', ...validCategories].map((cat) => (
                        <Link
                            key={cat}
                            href={{
                                pathname: '/cashier/menu',
                                query: { 
                                    ...(search && { search }),
                                    ...(cat !== 'ALL' && { category: cat })
                                }
                            }}
                            className={`text-sm font-medium px-4 py-2 rounded-full transition-all ${
                                category === cat || (cat === 'ALL' && !category)
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white'
                            }`}
                        >
                            {cat.charAt(0) + cat.slice(1).toLowerCase()}
                        </Link>
                    ))}
                </div>

                {/* Menu Items */}
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-y-24 place-items-center px-4 py-16'>
                    {menu.map((item) => (
                        <div
                            key={item.id}
                            className='w-full max-w-72 group rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary hover:text-white duration-300 p-5 shadow-xl flex flex-col items-center'
                        >
                            <div className='relative w-40 h-40 mb-4'>
                                <Image
                                    src={`${BASE_IMAGE_MENU}/${item.picture}`}
                                    alt={item.name}
                                    fill
                                    className='object-contain group-hover:scale-110 transition-transform'
                                    unoptimized
                                />
                            </div>
                            <div className='text-center'>
                                <h3 className='text-xl font-bold'>{item.name}</h3>
                                <p className='text-sm text-gray-500 group-hover:text-white'>{item.description}</p>
                                <p className='text-xl my-3'>${item.price}</p>
                                <Link
                                    href="/cashier/order"
                                    className='inline-block px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors'
                                >
                                    Order Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuPage;