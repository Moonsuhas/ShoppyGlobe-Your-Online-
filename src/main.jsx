import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import './index.css';
import App from './App.jsx';

// Get root element
const rootElement = document.getElementById('root');

// Wrapper component to add background animation effect
const AppWrapper = () => (
  <div className="fade-in" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)' }}>
    <App />
  </div>
);

// Render the app with Redux store and animations
createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </StrictMode>
);
