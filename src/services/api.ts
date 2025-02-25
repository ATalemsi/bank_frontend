import axios from "axios";

const API_BASE_URL = "http://localhost:8080";


const api = axios.create({
    baseURL: API_BASE_URL,
});



export const getCustomers = async () => {
    const response = await api.get("/customers");
    return response.data;
};

export const createCustomer = async (customerData: any) => {
    const response = await api.post("/customers", customerData);
    return response.data;
};

export const getAccountsByClientId = async (clientId: number) => {
    const response = await api.get(`/accounts/client/${clientId}`);
    return response.data;
};

export const getAccountById = async (accountId: number) => {
    const response = await api.get(`/accounts/${accountId}`);
    return response.data;
};

export const createAccount = async (accountData: any) => {
    try {
        const response = await api.post("/accounts", accountData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Extract the error message from the response body
            const errorMessage = error.response.data || "Failed to create account";
            throw new Error(errorMessage);
        }
        throw new Error("An unexpected error occurred");
    }
};

export const getAccounts = async () => {
    const response = await api.get("/accounts/all");
    return response.data;
}

