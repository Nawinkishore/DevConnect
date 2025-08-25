
export type FieldConfig = {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean;
};

export const signInConfig: FieldConfig[] = [
    { name: "email", label: "Email", type: "email", placeholder: "Enter email", required: true },
    { name: "password", label: "Password", type: "password", placeholder: "Enter password", required: true },
];
export const signUpConfig:FieldConfig[] = [
  { name: "fullname", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "password", label: "Password", type: "password", required: true },
  { name: "confirmPassword", label: "Confirm Password", type: "password", required: true },
];