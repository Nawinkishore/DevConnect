// src/SignIn.tsx

import React from "react";
import DynamicForm from "../../components/form/DynamiceForm";
import { signUpConfig } from "../../config/authConfig";
import { Link } from "react-router-dom";
const SignUp: React.FC = () => {

    const handleSignIn = (data: Record<string, string>) => {
        console.log("Sign Up Data:", data);

    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            {/* Pass config to DynamicForm */}
            <h2 className="text-xl mb-2 font-semibold">Create an Account</h2>
            <DynamicForm formType="Sign Up" fields={signUpConfig} onSubmit={handleSignIn} />
            <Link to="/auth/sign-in" >Already have an account? <span className=" hover:underline hover:text-blue-500">Sign In</span></Link>
        </div>
    );
};

export default SignUp;
