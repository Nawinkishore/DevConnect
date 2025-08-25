
export type FieldConfig = {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
};

export const signInConfig: FieldConfig[] = [
    { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
    { name: "password", label: "Password", type: "password", placeholder: "Enter password" },
];
export const signUpConfig: FieldConfig[] = [
    {
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
    },
    {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Re-enter your password",
    },
];
