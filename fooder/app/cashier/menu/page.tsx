'use client';

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation';
import { menu } from '../../../data/menu';

const MenuCashier = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get('category');

    const filteredMenu = category
        ? menu.filter(post => post.category.toLowerCase() === category.toLowerCase())
        : menu;

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value;
        router.push(selectedCategory ? `/manager/menu?category=${selectedCategory}` : '/manager/menu');
    };

    return (
        <div className='py-10 dark:bg-slate-900 dark:text-white min-h-dvh'>
            <div className='container'>
                {/* Header section */}
                <div className='text-center mb-20 max-w-[400px] mx-auto'>
                    <p className='text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>Our Menu</p>
                    <h1 className='text-3xl font-bold'>Menu</h1>
                    <p className='text-xs text-gray-400'>
                        {" "}
                        Lorem our adipisicing elit. Aliquid ullam a nisi vero qui sed consequuntur iste cum minima error.
                    </p>
                    <div className="mt-4 mb-6 flex justify-center space-x-4 text-primary">
                        <select
                            name="category"
                            value={category || ''}
                            onChange={handleCategoryChange}
                            className='p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600'
                        >
                            <option value="">All</option>
                            <option value="makanan">Makanan</option>
                            <option value="minuman">Minuman</option>
                            <option value="dessert">Dessert</option>
                        </select>
                    </div>
                </div>
                {/* Card section */}
                <div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 place-items-center py-16'>
                        {
                            filteredMenu.map(({ id, img, name, deskripsi }) => {
                                return (
                                    <div key={id} className='max-w-[300px] group rounded-2xl bg-white dark:bg-gray-800 dark:text-white  hover:bg-primary hover:text-white duration-300 p-4 shadow-xl'>
                                        <div className='h-[120px]'>
                                            <Image src={img} alt="" className='max-w-[200px] mx-auto block transform -translate-y-14 group-hover:scale-105 group-hover:rotate-6 duration-300' />
                                        </div>
                                        <div className='p-4 text-center'>
                                            <h1 className='text-xl font-bold'>{name}</h1>
                                            <p className='text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2'>{deskripsi}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuCashier;





