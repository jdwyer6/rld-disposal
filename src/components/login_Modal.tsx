import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithGoogle();
    onClose();
    navigate('/dashboard-home');
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err)
    }
  }

  const logout = async () => { 
    // try {
    //   await signOut(auth);
    // } catch (err) {
    //   console.error(err)
    // }
  }

  return (
    <div className="modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-12 shadow-xl z-10">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <button className="btn-primary w-full" type="submit">Sign in with google</button>
          <button onClick={logout} className="btn-primary w-full" type="submit">Log out</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
