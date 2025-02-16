import Img from '@/public/image/menu/biryani1.png'
import Img2 from '@/public/image/menu/biryani3.png'
import Img3 from '@/public/image/menu/biryani2.png'
import Img4 from '@/public/image/menu/jeruk.png'
import Img5 from '@/public/image/menu/mangga.png'
import Img6 from '@/public/image/menu/pisang.png'
import Img7 from '@/public/image/menu/maryam.png'
import Img8 from '@/public/image/menu/pancake.png'
import Img9 from '@/public/image/menu/wafles.png'

export interface dataTransaksi {
    id: number;
    image: any;
    name: string;
    price: number;
    category: string

}

export const transaksi: dataTransaksi[] = [
    { id: 1, name: 'Biryani', price: 50000, image: Img, category: 'makanan' },
    { id: 2, name: 'Chiken Biryani', price: 80000, image: Img2, category: 'makanan' },
    { id: 3, name: 'Rice Arabian', price: 20000, image: Img3, category: 'makanan' },
    { id: 4, name: 'Banana Milk', price: 25000, image: Img4, category: 'minuman' },
    { id: 5, name: 'Rice Arabian', price: 40000, image: Img5, category: 'minuman' },
    { id: 6, name: 'Rice Arabian', price: 56000, image: Img6, category: 'minuman' },
    { id: 7, name: 'Rice Arabian', price: 37000, image: Img7, category: 'dessert' },
    { id: 8, name: 'Rice Arabian', price: 24000, image: Img8, category: 'dessert' },
    { id: 9, name: 'Rice Arabian', price: 85000, image: Img9, category: 'dessert' },
];
