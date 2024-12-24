import { Box, Typography, Container } from '@mui/material';
import React, { useEffect , useState} from 'react';
import { ReactNode } from 'react';
import "../style.scss";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store.ts';
import { useNavigate } from 'react-router-dom';




interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setIsLoading(false); // Finish loading after the check
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return null; 
  }

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