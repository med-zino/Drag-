import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../redux/slices/authSlice.ts';
import { loginUser } from '../api/auth.ts';

interface Credentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: Credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data: LoginResponse = await loginUser(credentials);
      dispatch(loginSuccess(data.token));
      navigate('/dashboard');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      dispatch(loginFailure(errorMessage));
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;