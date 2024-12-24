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
          submitText: "Verify Email",
          inputs: [
            {
              name: "email",
              label: "Email",
              type: "email",
              required: true,
              validation: {
                pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                message: "Please enter a valid email",
              },
            },
          ],
          validationFn: verifyEmail,
        },
        {
          title: "Create your account",
          subtitle: "Fill in your personal details",
          inputs: [
            {
              name: "fullName",
              label: "Full Name",
              type: "text",
              required: true,
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              required: true,
              validation: {
                minLength: 8,
                message: "Password must be at least 8 characters",
              },
            },
          ],
        },
        {
          title: "Company Information",
          subtitle: "Tell us about your organization",
          inputs: [
            {
              name: "companyName",
              label: "Company Name",
              type: "text",
              required: true,
            },
            {
              name: "companySize",
              label: "Company Size",
              type: "select", // Change to select
              options: [
                { value: "0-50", label: "0-50" },
                { value: "50-100", label: "50-100" },
              ],
              required: true,
            },
            {
              name: "industry",
              label: "Industry",
              type: "select", // Change to select
              options: [
                { value: "technology", label: "Technology" },
                { value: "healthcare", label: "Healthcare" },
                { value: "finance", label: "Finance" },
                { value: "education", label: "Education" },
              ],
              required: true,
            },
            {
              name: "acceptTerms",
              label: "I accept the terms and conditions",
              type: "checkbox", // Add checkbox
              required: true,
            },
          ],
        },
      ],
      onSubmit: handleSubmit,
    };
    
  
    return (
      <AuthLayout>
        <MultiStepAuthForm {...signupConfig} />
      </AuthLayout>
    );
  };