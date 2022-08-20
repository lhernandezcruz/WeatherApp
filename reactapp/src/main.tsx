import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import AppProvider from './AppProvider';

const render = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  if (import.meta.env.VITE_MOCKING_ENABLED) {
    const { worker } = await import('../mocks/browser');
    await worker.start();
    worker.printHandlers();
  }
  root.render(
    <React.StrictMode>
      <AppProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </AppProvider>
    </React.StrictMode>
  );
};

render();
