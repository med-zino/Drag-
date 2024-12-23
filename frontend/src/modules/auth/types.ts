// types.ts
export interface FormInput {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'tel';
    required?: boolean;
    placeholder?: string;
    validation?: {
      minLength?: number;
      maxLength?: number;
      pattern?: string;
      message?: string;
    };
  }
  
  export interface FormAction {
    label: string;
    type: 'link' | 'button';
    href?: string;
    onClick?: () => void;
  }
  
  export interface FormConfig {
    title: string;
    subtitle?: string;
    inputs: FormInput[];
    submitText: string;
    actions?: FormAction[];
    onSubmit: (data: Record<string, string>) => void;
  }

  export interface AuthStep {
    title: string;
    subtitle?: string;
    inputs: FormInput[];
    actions?: FormAction[];
    validationFn?: (data: Record<string, string>) => Promise<boolean>;
  }
  
  export interface MultiStepAuthConfig {
    steps: AuthStep[];
    onSubmit: (data: Record<string, string>) => void;
  }