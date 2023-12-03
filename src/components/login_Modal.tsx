import React, { useState } from 'react';

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

  return (
    <div className="modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-12 shadow-xl z-10">
      <div className="modal-content">
        <h2 className="rld-margin-bottom-sm text-center">Login</h2>
        <form onSubmit={handleSubmit}>
            <div className='rld-margin-bottom-sm'>
                <label className="mr-2">Username:</label>
                <input type="text" className="border" value={username} onChange={handleUsernameChange} />
            </div>
            <div className='rld-margin-bottom-sm'>
                <label className="mr-2">Password:</label>     
                    <input type="password" className="border" value={password} onChange={handlePasswordChange} />
            </div>

          <button className="btn-primary w-full" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
