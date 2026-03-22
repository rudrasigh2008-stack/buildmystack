import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <Toaster position="bottom-right" />
      <AppRoutes />
    </div>
  );
}

export default App;
