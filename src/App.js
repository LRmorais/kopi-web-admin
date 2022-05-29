import React from 'react';
import './App.css';

import Dashboard from './pages/home';
import DataProvider from './services/context';
// app
function App() {

  return (
    <DataProvider>
    <div className="App">
      <Dashboard />
    </div>
    </DataProvider>
  );
}

export default App;