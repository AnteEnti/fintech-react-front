import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { StyleProvider } from './context/StyleContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <StyleProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StyleProvider>
    </LanguageProvider>
  </React.StrictMode>
);