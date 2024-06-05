import { useState } from 'react';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import AuthTest from './components/AuthTest';
import LogoutButton from './components/LogoutButton';

function App() {
  return (
    <>
      <SignupForm />
      <LoginForm />
      <LogoutButton />
      <AuthTest />
    </>
  );
}

export default App;
