import { IOrder } from "../../../app/types";
import { getCookies } from "../../../lib/server-cookies";
import { BASE_API_URL } from "../../../global";
import { get } from "../../../lib/bridge";
import { AlertInfo } from "../../../components/alert";
import Image from "next/image"
import Search from "./search";
import DeleteOrder from "./deleteOrder";
import EditOrder from "./editTransaksi";
// import AddMenu from "./addMenu";
// import EditMenu from "./editMenu";
// import DeleteMenu from "./deleteMenu";

const getOrder = async (search: string): Promise<IOrder[]> => {
  try {
    const TOKEN = getCookies("token")
    const url = `${BASE_API_URL}/order?search=${search}`
    const { data } = await get(url, await TOKEN)
    let result: IOrder[] = []
    if (data?.status) result = [...data.data]
    return result
  } catch (error) {
    console.log(error)
    return []
  }
}

const TransaksiPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const search = searchParams.search ? searchParams.search.toString() : ``
  const order: IOrder[] = await getOrder(search)

  const category = (cat: string): React.ReactNode => {
    if (cat === "NEW") {
      return <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
        New
      </span>
    }
    if (cat === "PAID") {
      return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
        Paid
      </span>
    }
    return <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
      Done
    </span>
  }

  return (
    <div>
      <div className="mt-2 bg-slate-900 rounded-lg p-3 border-t-4 border-t-primary shadow-md">
        <h4 className="text-xl font-bold mb-2 text-white">Menu Data</h4>
        <p className="text-sm text-secondary mb-4">
          This page displays menu data, allowing menus to view details,
          search, and manage menu items by adding, editing, or deleting them.
        </p>
        <div className="flex justify-between items-center mb-4">
          {/* Search Bar */}
          <div className="flex items-center w-full max-w-md flex-grow">
            <Search url={`/manager/transaksi`} search={search} />
          </div>
          {/* Add Menu Button */}
          <div className="ml-4">
            {/* <AddMenu /> */}
          </div>
        </div>
        {
          order.length == 0 ?
            <AlertInfo title="informasi">
              No data Available
            </AlertInfo>
            :
            <div className="m-2">
              {order.map((data, index) => (
                <div key={`keyPrestasi${index}`} className={`flex flex-wrap shadow m-2`}>
                  <div className="w-full md:w-2/12 p-2 text-white">
                    <small className="text-sm font-bold text-primary">Customer</small> <br />
                    {data.customer}
                  </div>
                  <div className="w-full md:w-1/12 p-2 text-white">
                    <small className="text-sm font-bold text-primary">Total Price</small> <br />
                    {data.total_price}
                  </div>
                  <div className="w-full md:w-5/12 p-2 text-white">
                    <small className="text-sm font-bold text-primary">Payment Method</small> <br />
                    {data.payment_method}
                  </div>
                  <div className="w-full md:w-1/12 p-2 text-white">
                    <small className="text-sm font-bold text-primary">Status</small> <br />
                    {category(data.status)}
                  </div>
                  <div className="w-full md:w-1/12 p-2 text-white">
                    <small className="text-sm font-bold text-primary">Action</small> <br />
                    <div className="flex space-x-3">
                    <EditOrder selectedOrder={data}/>
                    <DeleteOrder selectedOrder={data}/>
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
export default TransaksiPage





