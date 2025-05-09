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
        <div className="bg-slate-900">{children}</div>
    )
}

export default RootLayout
