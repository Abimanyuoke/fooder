import React from "react"

export const metadata = {
    title: 'Login | Fooder',
    description: 'Praktikum SMK Telkom Malang',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <div className="bg-slate-900 h-full overflow-x-hidden">{children}</div>
    )
}

export default RootLayout
