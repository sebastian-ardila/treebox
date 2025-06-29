// import React from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <Home />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App; 