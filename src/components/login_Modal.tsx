import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    onClose();
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
        <h2 className="mb-sm text-center">Login</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-sm'>
                <label className="mr-2">Username:</label>
                <input type="text" className="border" value={username} onChange={handleUsernameChange} />
            </div>
            <div className='mb-sm'>
                <label className="mr-2">Password:</label>     
                    <input type="password" className="border" value={password} onChange={handlePasswordChange} />
            </div>

          <button className="btn-primary w-full" type="submit">Login</button>
          <button onClick={signInWithGoogle} className="btn-primary w-full" type="submit">Sign in with google</button>
          <button onClick={logout} className="btn-primary w-full" type="submit">Log out</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
