import React from "react";
import { AuthLayout } from '../components/AuthLayout.tsx';
import { MultiStepAuthConfig } from '../types';
import { MultiStepAuthForm } from "../components/MultiStepAuthForm.tsx";

export const SignupPage = () => {
    const handleSubmit = async (data: Record<string, string>) => {
      console.log('Final form data:', data);
      // Submit to your API
    };
  
    const verifyEmail = async (data: Record<string, string>) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const emailExists = false; 
      return !emailExists;
    };
  
    const signupConfig: MultiStepAuthConfig = {
      steps: [
        {
          title: "Sign Up",
          subtitle: "Let’s validate your email first",
          inputs: [
            {
              name: "email",
              label: "Email",
              type: "email",
              required: true,
              validation: {
                pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                message: "Please enter a valid email"
              }
            }
          ],
          validationFn: verifyEmail
        },
        {
          title: "Create your account",
          subtitle: "Fill in your personal details",
          inputs: [
            {
              name: "fullName",
              label: "Full Name",
              type: "text",
              required: true
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              required: true,
              validation: {
                minLength: 8,
                message: "Password must be at least 8 characters"
              }
            }
          ]
        },
        {
          title: "Company Information",
          subtitle: "Tell us about your organization",
          inputs: [
            {
              name: "companyName",
              label: "Company Name",
              type: "text",
              required: true
            },
            {
              name: "companySize",
              label: "Company Size",
              type: "text",
              required: true
            },
            {
              name: "industry",
              label: "Industry",
              type: "text",
              required: true
            }
          ]
        }
      ],
      onSubmit: handleSubmit
    };
  
    return (
      <AuthLayout>
        <MultiStepAuthForm {...signupConfig} />
      </AuthLayout>
    );
  };