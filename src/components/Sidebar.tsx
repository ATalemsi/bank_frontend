import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Users, CreditCard } from "lucide-react"

const Sidebar: React.FC = () => {
    const location = useLocation()

    const navItems = [
        { icon: Home, label: "Dashboard", path: "/" },
        { icon: Users, label: "Customers", path: "/customers" },
        { icon: CreditCard, label: "Accounts", path: "/accounts" },
    ]

    return (
        <div className="h-screen w-64 bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] p-4 space-y-4">
            <div className="text-2xl font-bold mb-8 text-[hsl(var(--primary))]">Bank App</div>
            <nav>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                            location.pathname === item.path
                                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                                : "hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]"
                        }`}
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default Sidebar

