import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../config/firebase';
import { UserCredential } from 'firebase/auth';
import MessageModal from '../components/MessageModal';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

  const handleSignIn = async () => {
    try {
      const result: UserCredential = await signInWithGoogle();
      if (result.user) {
        /********** IMPORTANT **********
        USER SIGN UP DISABLED ON FIREBASE
        To create a user enable sign up at firebase console --> authentication --> settings --> user actions --> enable sign up
         *******************************/
        navigate('/admin');
      }
    } catch (error: any) {
        setErrorMessage(error.message);
        setModalIsOpen(true);
      console.error('Error during sign in: ', error.message);
    }
  };

  return (
    <>
        <div className="container my-lg">
            <h1 className="text-center my-sm">Login</h1>
            <button onClick={handleSignIn}>Sign in with Google</button>
        </div>

        <MessageModal message={errorMessage ? errorMessage + " Check you are not signed in to a different Google Account." : "There has been a problem with the sign in process."} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} closeModalText={"Back"}/>
    </>

  );
};

export default Login;
