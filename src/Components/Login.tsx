import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../firebase';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      console.log('Usuário logado com Google:', result.user);
      navigate('/');
    } catch (error) {
      console.error('Erro ao logar com Google:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Login com Google</button>
    </div>
  );
};

export default Login;
