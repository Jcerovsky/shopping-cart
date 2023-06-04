import React from 'react';
import ReactDOM from 'react-dom/client';
import Client from './Client';
import './index.css';

if (typeof window !== 'undefined') {
  ReactDOM.createRoot(window.document.querySelector('#client') as HTMLDivElement).render(<Client />);
}

export default <div id="client" />;
