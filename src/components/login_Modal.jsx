import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithGoogle();
    onClose();
    navigate('/dashboard-home');
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => { 
    // try {
    //   await signOut(auth);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="m-0">
          <h1 className="text-center">Login</h1>
          <button className="btn-primary w-full" type="submit">Sign in with google</button>
          <button onClick={logout} className="w-full m-0" type="submit">Log out</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
