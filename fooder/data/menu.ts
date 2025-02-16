import Img from '../public/image/biryani1.png'
import Img2 from '../public/image/biryani3.png'
import Img3 from '../public/image/biryani2.png'
import Img4 from '../public/image/jeruk.png'
import Img5 from '../public/image/mangga.png'
import Img6 from '../public/image/pisang.png'
import Img7 from '../public/image/maryam.png'
import Img8 from '../public/image/pancake.png'
import Img9 from '../public/image/wafles.png'


export interface dataMenu {
  id: number;
  img: any;
  name: string;
  deskripsi: string
  category: string
}

export const menu: dataMenu[] = [
  {
    id: 1,
    img: Img,
    name: "Biryani",
    deskripsi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia fuga explicabo nemo. Labore, quibusdam eius.",
    category: "makanan"
  },
  {
    id: 2,
    img: Img2,
    name: "Chiken Biryani",
    deskripsi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia fuga explicabo nemo. Labore, quibusdam eius.",
    category: "makanan"
  },

  {
    id: 3,
    img: Img3,
    name: "Rice Arabian",
    deskripsi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia fuga explicabo nemo. Labore, quibusdam eius.",
    category: "makanan"
  },
  {
    id: 4,
    img: Img4,
    name: "Rice Arabian",
    deskripsi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia fuga explicabo nemo. Labore, quibusdam eius.",
    category: "minuman"
  },
  {
    id: 5,
    img: Img5,
    name: "Rice Arabian",
    deskripsi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia fuga explicabo nemo. Labore, quibusdam eius.",
    category: "minuman"
  },
  {
    id: 6,
    img: Img6,
    name: "Rice Arabian",
    deskripsi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia fuga explicabo nemo. Labore, quibusdam eius.",
    category: "minuman"
  },
  {
    id: 7,
    img: Img7,
    name: "Rice Arabian",
    deskripsi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia fuga explicabo nemo. Labore, quibusdam eius.",
    category: "dessert"
  },
  {
    id: 8,
    img: Img8,
    name: "Rice Arabian",
    deskripsi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia fuga explicabo nemo. Labore, quibusdam eius.",
    category: "dessert"
  },
  {
    id: 9,
    img: Img9,
    name: "Rice Arabian",
    deskripsi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia fuga explicabo nemo. Labore, quibusdam eius.",
    category: "dessert"
  },
]