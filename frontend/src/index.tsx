import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.ts';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
