import type React from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { Button, TextField, Card, CardContent, Box } from "@mui/material"
import { UserPlus } from "lucide-react"

interface CustomerFormProps {
    onSubmit: (customerData: any) => void
}

const validationSchema = Yup.object({
    nom: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
})

const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit }) => {
    return (
        <Card className="max-w-md mx-auto mb-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden border border-border/50">
            <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-6">
                <h2 className="text-2xl font-semibold tracking-tight">Add New Client</h2>
                <p className="text-primary-foreground/80 mt-1 text-sm">Enter client details below</p>
            </div>
            <CardContent className="p-6">
                <Formik
                    initialValues={{ nom: "", email: "" }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        await onSubmit(values)
                        resetForm()
                    }}
                >
                    {({ errors, touched, handleChange, handleBlur, values }) => (
                        <Form className="space-y-6">
                            <div className="space-y-2">
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Name"
                                    name="nom"
                                    value={values.nom}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.nom && Boolean(errors.nom)}
                                    helperText={touched.nom && errors.nom}
                                    variant="outlined"
                                    className="backdrop-blur-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    variant="outlined"
                                    className="backdrop-blur-sm"
                                />
                            </div>

                            <Box className="flex justify-end pt-4">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    <UserPlus className="h-5 w-5" />
                                    Add Client
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    )
}

export default CustomerForm

