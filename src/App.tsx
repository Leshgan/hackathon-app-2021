import React from 'react';
import './App.css';
import Routes from "./router";
import { AuthProvider } from './state/auth'

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App
