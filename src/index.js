import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

console.log('Mounting React app...');
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('Root element found:', document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log('React app mounted'); 