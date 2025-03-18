import { IMenu } from "@/app/types";
import { getCookies } from "../../../lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
import { get } from "../../../lib/bridge";
import { AlertInfo } from "@/components/alert";
import Image from "next/image";
import AddOrder from "./addOrder";
import CounterButton from "@/components/countButton";

const getMenu = async (search: string): Promise<IMenu[]> => {
  try {
    const TOKEN = getCookies("token");
    const url = `${BASE_API_URL}/menu?search=${search}`;
    const { data } = await get(url, await TOKEN);
    let result: IMenu[] = [];
    if (data?.status) result = [...data.data];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const TranskasiPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const search = searchParams.search ? searchParams.search.toString() : ``;
  const menu: IMenu[] = await getMenu(search);

  const category = (cat: string): React.ReactNode => {
    if (cat === "FOOD") {
      return <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Food</span>;
    }
    if (cat === "SNACK") {
      return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">Snack</span>;
    }
    return <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">Drink</span>;
  };

    return (
      <div>
        <div className="mt-2 bg-slate-900 rounded-lg p-3 border-t-4 border-t-primary shadow-md">
          <h4 className="text-xl font-bold mb-2 text-white">Menu Data</h4>
          <p className="text-sm text-secondary mb-4">
            This page displays menu data, allowing menus to view details, search, and manage menu items by adding, editing, or deleting them.
          </p>
          <div className="flex justify-between items-center mb-4">
            <div className="ml-4">
              <AddOrder />
            </div>
          </div>
          {
            menu.length == 0 ?
              <AlertInfo title="informasi">
                No data Available
              </AlertInfo>
              :
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-2">
                {menu.map((data, index) => (
                  <div key={`keyPrestasi${index}`} className="shadow p-4 bg-gray-800 rounded-lg flex flex-col items-center text-center">
                    <Image width={80} height={80} src={`${BASE_IMAGE_MENU}/${data.picture}`} className="rounded-sm overflow-hidden mb-2" alt="preview" unoptimized />
                    <h5 className="text-white font-bold text-lg">{data.name}</h5>
                    <p className="text-white text-sm">{data.description}</p>
                    <span className="text-primary font-bold text-lg">{data.price}</span>
                    <div className="mt-2">{category(data.category)}</div>
                    <div className="flex items-center mt-3">
                      <div className="flex items-center space-x-3">
                        <CounterButton/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          }
        </div>
      </div>
    );
  };
export default TranskasiPage