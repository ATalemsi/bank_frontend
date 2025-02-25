import type React from "react"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

const Layout: React.FC = () => {
    return (
        <div className="flex h-screen bg-[hsl(var(--background))]">
            <Sidebar />
            <main className="flex-1 overflow-auto p-8">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout

