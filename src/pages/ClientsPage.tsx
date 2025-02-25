import React, { useEffect, useState } from "react";
import { createCustomer, getCustomers } from "../services/api";
import CustomerForm from "../components/CustomerForm";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Snackbar,
    Alert,
} from "@mui/material";
import { User, Mail, Wallet } from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface Customer {
    id: number;
    nom: string;
    email: string;
}

const ClientsPage: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const data = await getCustomers();
            setCustomers(data);
        } catch (error) {
            console.error("Failed to fetch customers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCustomer = async (customerData: any) => {
        try {
            await createCustomer(customerData);
            await fetchCustomers();
            setSuccessMessage("Client added successfully!");
        } catch (error) {
            console.error("Failed to create customer:", error);
        }
    };

    return (
        <Container maxWidth="lg" className="py-8">
            <Typography
                variant="h3"
                component="h1"
                className="text-center mb-8 font-bold"
            >
                Client Management
            </Typography>

            <CustomerForm onSubmit={handleCreateCustomer} />

            <div className="h-px bg-border my-8" />

            <Typography variant="h5" className="mb-4 font-semibold">
                Client List
            </Typography>

            {loading ? (
                <div className="flex justify-center my-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
            ) : (
                <Grid container spacing={3}>
                    {customers.map((customer) => (
                        <Grid item xs={12} sm={6} md={4} key={customer.id}>
                            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <User className="h-5 w-5 text-primary" />
                                        <Typography variant="h6">{customer.nom}</Typography>
                                    </div>

                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                        <Typography variant="body2">{customer.email}</Typography>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => navigate(`/accounts/${customer.id}`)}
                                            className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                                        >
                                            <Wallet className="h-5 w-5 text-primary" />
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setSuccessMessage(null)}
                    severity="success"
                    variant="filled"
                >
                    {successMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ClientsPage;
