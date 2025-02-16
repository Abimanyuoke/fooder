import CashierTemplate from "@/components/cashierTemplate"
import CahsierList from "../../cashierList"

export const metadata = {
    title: 'Dashboard | Ordering System',
    description: 'Generated by create next app',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <CashierTemplate title="Dashboard" id="dashboard" menuList={CahsierList}>
            {children}
        </CashierTemplate>
    )
}

export default RootLayout