import React from 'react';
import { createRoot } from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import App from 'container/App';
import "assets/scss/index.scss";

const container = document.getElementById('root');
const root = container && createRoot(container); // createRoot(container!) if you use TypeScript

root?.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
