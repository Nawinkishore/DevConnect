// src/SignIn.tsx

import React from "react";
import DynamicForm from "../../components/form/DynamiceForm";
import { signInConfig } from "../../config/authConfig";
import { Link } from "react-router-dom";
const SignIn: React.FC = () => {

    const handleSignIn = (data: Record<string, string>) => {
        console.log("Sign In Data:", data);

    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            {/* Pass config to DynamicForm */}
            <h2 className="text-xl mb-2 ">Login</h2>
            <DynamicForm formType="Sign In" fields={signInConfig} onSubmit={handleSignIn} />
            <Link to="/auth/sign-up" >Don't have an account? <span className=" hover:underline hover:text-blue-500">Sign Up</span></Link>
        </div>
    );
};

export default SignIn;
