import { AuthLayout } from '../components/AuthLayout.tsx';
import { AuthForm } from '../components/AuthForm.tsx';
import { FormConfig } from '../types';
import React from 'react';

export const Login = () => {
    const handleSubmit = (data: Record<string, string>) => {
        console.log('Form submitted:', data);
      };
    
      const formConfig: FormConfig = {
        title: "Login",
        inputs: [
          {
            name: "email",
            label: "Enter your email",
            type: "email",
            validation: {
              pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
            }
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            validation: {
              minLength: 8,
            }
          }
        ],
        submitText: "Login",
        actions: [
          {
            label: "Forgot Password?",
            type: "link",
            href: "/forgot-password"
          },
          {
            label: "Create Account",
            type: "link",
            href: "/signup"
          }
        ],
        onSubmit: handleSubmit
      };
    
      return (
        <AuthLayout>
          <AuthForm {...formConfig} />
        </AuthLayout>
      );
};