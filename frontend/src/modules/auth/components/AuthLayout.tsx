import { Box, Typography, Container } from '@mui/material';
import React from 'react';
import { ReactNode } from 'react';
import "../style.scss";


interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
      <Box className="auth-layout">
        <Container className="container">
          <Box className="logo-container">
            <img src="/rrLogo.svg" alt="Roundrush Logo" />
            <Typography className="subtitle">
              <span>
                The Optimized Workflow
                <br />
                Out of the Box
              </span>
            </Typography>
          </Box>
          {children}
        </Container>
      </Box>
    );
  };