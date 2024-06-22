// Login.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../config/firebase';
import { UserCredential } from 'firebase/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const result: UserCredential = await signInWithGoogle();
      if (result.user) {
        // Redirect to admin page after successful login
        navigate('/admin');
      }
    } catch (error: any) {
      console.error('Error during sign in: ', error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
