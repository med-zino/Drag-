import { useState } from 'react';
import {
  Box,
  CardContent,
  Button,
} from '@mui/material';
import { AuthForm } from './AuthForm.tsx';
import { MultiStepAuthConfig, FormConfig } from '../types';
import React from 'react';
import { useNavigate } from 'react-router-dom';



export const MultiStepAuthForm = ({ steps, onSubmit }: MultiStepAuthConfig) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [dynamicSteps, setDynamicSteps] = useState(steps);
  const navigate = useNavigate();


  const handleStepSubmit = async (stepData: Record<string, string>) => {
    setLoading(true);
    try {
      const currentStep = dynamicSteps[activeStep];
      const newFormData = { ...formData, ...stepData };
      setFormData(newFormData);
  
      if (currentStep.validationFn) {
        const isValid = await currentStep.validationFn(stepData);
  
        if (!isValid) {
          setDynamicSteps((prevSteps) => [
            ...prevSteps.slice(0, activeStep + 1),
            {
              title: "Email Already Exists",
              subtitle: "This email is already registered.",
              inputs: [], // No inputs for this step
              submitText: "Go to Login",
              onSubmit: async () => {
                navigate("/login"); // Trigger navigation
              },
            },
          ]);
  
          setActiveStep(activeStep + 1);
          return; // Prevent further execution
        }
      }
  
      if (currentStep.onSubmit) {
        await currentStep.onSubmit(newFormData);
      } else if (activeStep === dynamicSteps.length - 1) {
        await onSubmit(newFormData); // Default final submit
      } else {
        setActiveStep((prev) => prev + 1); // Move to the next step
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const currentStepConfig: FormConfig = {
    ...dynamicSteps[activeStep],
    submitText:
      dynamicSteps[activeStep].submitText ||
      (activeStep === dynamicSteps.length - 1 ? "Complete Signup" : "Next"),
    onSubmit: handleStepSubmit,
  };

  return (
      <CardContent sx={{ p: 4 }}>
        <AuthForm {...currentStepConfig} />
        {activeStep > 0 && dynamicSteps[activeStep].inputs.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleBack}
              disabled={loading}
              variant="text"
            >
              Back
            </Button>
          </Box>
        )}
      </CardContent>
  );
};
