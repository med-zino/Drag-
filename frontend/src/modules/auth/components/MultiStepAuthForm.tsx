import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { AuthForm } from './AuthForm.tsx';
import { MultiStepAuthConfig, FormConfig } from '../types';
import React from 'react';

export const MultiStepAuthForm = ({ steps, onSubmit }: MultiStepAuthConfig) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleStepSubmit = async (stepData: Record<string, string>) => {
    setLoading(true);
    try {
      const currentStep = steps[activeStep];
      const newFormData = { ...formData, ...stepData };
      setFormData(newFormData);

      if (currentStep.validationFn) {
        const isValid = await currentStep.validationFn(stepData);
        if (!isValid) return;
      }

      if (activeStep === steps.length - 1) {
        await onSubmit(newFormData);
      } else {
        setActiveStep(prev => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const currentStepConfig: FormConfig = {
    ...steps[activeStep],
    submitText: activeStep === steps.length - 1 ? 'Complete Signup' : 'Next',
    onSubmit: handleStepSubmit
  };

  return (
      <CardContent sx={{ p: 4 }}>
        <AuthForm {...currentStepConfig} />
        {activeStep > 0 && (
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
