import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Link,
  Card,
  CardContent,
  Typography,
  CircularProgress
} from "@mui/material";
import { FormConfig } from "../types";
import "../style.scss";

export const AuthForm = ({
  title,
  subtitle,
  inputs,
  submitText,
  actions = [],
  onSubmit,
}: FormConfig) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Card className="auth-form-card">
      <CardContent className="auth-form-content">
        <Typography
          variant="h5"
          component="h1"
          className={`auth-form-title ${subtitle ? "with-subtitle" : ""}`}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle1" className="auth-form-subtitle">
            {subtitle}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <TextField
              key={input.name}
              fullWidth
              name={input.name}
              label={input.label}
              type={input.type}
              placeholder={input.placeholder}
              margin="normal"
              required={input.required}
              value={formData[input.name] || ""}
              onChange={handleChange}
            />
          ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="auth-form-submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : submitText}
          </Button>

          {actions.length > 0 && (
            <Box
              className={`auth-form-actions ${
                actions.length === 1 ? "single" : "multiple"
              }`}
            >
              {actions.map((action, index) =>
                action.type === "link" ? (
                  <Link
                    key={index}
                    href={action.href}
                    underline="none"
                    onClick={action.onClick}
                  >
                    {action.label}
                  </Link>
                ) : (
                  <Button key={index} variant="text" onClick={action.onClick}>
                    {action.label}
                  </Button>
                )
              )}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
