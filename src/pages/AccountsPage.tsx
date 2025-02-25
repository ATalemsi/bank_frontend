"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, Plus } from "lucide-react"
import AccountForm from "../components/AccountForm"
import { getAccountsByClientId, createAccount } from "../services/api"

interface Account {
    id: number
    type: string
    solde: number
    clientId: number
}

const AccountsPage: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([])
    const [isFormVisible, setIsFormVisible] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchAccounts().then(r => console.log("Accounts fetched"))
    }, [])

    const fetchAccounts = async () => {
        try {
            const allAccounts: Account[] = []
            // Assuming we have a list of client IDs or a way to fetch all accounts
            // This is a placeholder and should be replaced with the actual API call
            const clientIds = [1, 2, 3] // Replace with actual client IDs
            for (const clientId of clientIds) {
                const clientAccounts = await getAccountsByClientId(clientId)
                allAccounts.push(...clientAccounts)
            }
            setAccounts(allAccounts)
        } catch (error) {
            console.error("Failed to fetch accounts:", error)
        }
    }

    const handleSubmit = async (accountData: any) => {
        try {
            await createAccount(accountData)
            setIsFormVisible(false)
            await fetchAccounts() // Refresh the account list
        } catch (error) {
            console.error("Failed to create account:", error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">Accounts</h1>
                <button
                    onClick={() => setIsFormVisible(!isFormVisible)}
                    className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md hover:bg-[hsl(var(--primary))] hover:bg-opacity-80 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Add Account
                </button>
            </div>

            {isFormVisible && (
                <div className="bg-[hsl(var(--card))] p-6 rounded-xl shadow-lg border border-[hsl(var(--border))]">
                    <h2 className="text-xl font-semibold mb-4">Create New Account</h2>
                    <AccountForm onSubmit={handleSubmit} />
                </div>
            )}

            <div className="bg-[hsl(var(--card))] p-6 rounded-xl shadow-lg border border-[hsl(var(--border))]">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-[hsl(var(--border))]">
                            <th className="py-2 px-4 text-left">ID</th>
                            <th className="py-2 px-4 text-left">Type</th>
                            <th className="py-2 px-4 text-left">Balance</th>
                            <th className="py-2 px-4 text-left">Client ID</th>
                            <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {accounts.map((account) => (
                            <tr key={account.id} className="hover:bg-[hsl(var(--muted))]">
                                <td className="py-2 px-4">{account.id}</td>
                                <td className="py-2 px-4">{account.type}</td>
                                <td className="py-2 px-4">€{account.solde.toFixed(2)}</td>
                                <td className="py-2 px-4">{account.clientId}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => navigate(`/account/${account.id}`)}
                                        className="p-2 hover:bg-[hsl(var(--primary))] hover:bg-opacity-10 rounded-full transition-colors"
                                    >
                                        <Eye className="h-5 w-5 text-[hsl(var(--primary))]" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AccountsPage

