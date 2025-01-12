import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles/style.css';

const rootElement = document.getElementById('root');
if (rootElement != null) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found');
}
