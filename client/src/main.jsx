import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ColorProvider } from './context/ColorContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ColorProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ColorProvider>
    </ThemeProvider>
  </React.StrictMode>
);
