"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { getCustomers } from "../services/api"
import { AlertCircle } from "lucide-react"

interface AccountFormProps {
    onSubmit: (accountData: any) => void
}

interface Client {
    id: number
    nom: string
}

const validationSchema = Yup.object({
    clientId: Yup.number().required("Client ID is required"),
    type: Yup.string().required("Account type is required"),
    solde: Yup.number().required("Balance is required").min(0, "Balance must be positive"),
})

const AccountForm: React.FC<AccountFormProps> = ({ onSubmit }) => {
    const [clients, setClients] = useState<Client[]>([])

    useEffect(() => {
        fetchClients().then((r) => console.log("Clients fetched"))
    }, [])

    const fetchClients = async () => {
        try {
            const data = await getCustomers()
            setClients(data)
        } catch (error) {
            console.error("Failed to fetch clients:", error)
        }
    }

    return (
        <Formik
            initialValues={{ clientId: "", type: "", solde: "" }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <Form className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 font-serif">Create New Account</h2>
                    <div>
                        <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Client
                        </label>
                        <Field
                            as="select"
                            id="clientId"
                            name="clientId"
                            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${
                                errors.clientId && touched.clientId ? "border-red-500" : "border-gray-300"
                            } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md transition duration-150 ease-in-out`}
                        >
                            <option value="">Select a client</option>
                            {clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.nom}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="clientId">
                            {(msg) => (
                                <div className="mt-1 flex items-center text-sm text-red-600">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    {msg}
                                </div>
                            )}
                        </ErrorMessage>
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Account Type
                        </label>
                        <Field
                            as="select"
                            id="type"
                            name="type"
                            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${
                                errors.type && touched.type ? "border-red-500" : "border-gray-300"
                            } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md transition duration-150 ease-in-out`}
                        >
                            <option value="">Select type</option>
                            <option value="COURANT">Courant</option>
                            <option value="EPARGNE">Epargne</option>
                        </Field>
                        <ErrorMessage name="type">
                            {(msg) => (
                                <div className="mt-1 flex items-center text-sm text-red-600">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    {msg}
                                </div>
                            )}
                        </ErrorMessage>
                    </div>
                    <div>
                        <label htmlFor="solde" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Balance
                        </label>
                        <Field
                            type="number"
                            id="solde"
                            name="solde"
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.solde && touched.solde ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out`}
                        />
                        <ErrorMessage name="solde">
                            {(msg) => (
                                <div className="mt-1 flex items-center text-sm text-red-600">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    {msg}
                                </div>
                            )}
                        </ErrorMessage>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105"
                    >
                        Create Account
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default AccountForm

