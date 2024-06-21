import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithEmail,
} from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // autenticação com google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      console.log("User logged in with Google:", result.user);
      navigate("/");
    } catch (error) {
      console.error("Error when logging in with Google:", error);
    }
  };

  // autenticação com facebook
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithFacebook();
      console.log("User logged in with Google:", result.user);
      navigate("/");
    } catch (error) {
      console.error("Error when logging in with Facebook:", error);
    }
  };

  // autenticação com email e senha cadastrados no console firebase
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signInWithEmail(email, password);
      console.log("User logged in with Email and Password:", result.user);
      navigate("/");
    } catch (error) {
      console.error("Error when logging in with Email and Password:", error);
    }
  };

  useEffect(() => {
    document.title = "Login";
  });

  return (
    <section className="bg-gray-200">
      <main className="container mx-auto flex flex-col justify-center items-center min-h-screen">
        <div className="px-3 sm:px-32 bg-white flex flex-col items-center rounded-lg shadow-xl">
          <img
            src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/logo-header.svg"
            alt="icon page"
            className="pt-20"
          />
          <h2 className="font-poppins font-bold text-5xl text-center pb-10">
            Login
          </h2>
          <form
            onSubmit={handleEmailLogin}
            className="mt-4 flex flex-col items-center border-b border-black"
          >
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-poppins text-sm placeholder:text-9F9F9F px-4 py-2 mb-4 border border-black rounded-md w-72 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-poppins text-sm placeholder:text-9F9F9F px-4 py-2 mb-4 border border-black rounded-md w-72 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-Primary text-white font-bold rounded-lg active:bg-Primary2  transition-colors w-72 mb-10"
            >
              Login
            </button>
          </form>
          <div className=" mt-10 mb-20">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center font-poppins font-bold text-sm border border-black rounded-md p-2 pr-7 bg-white mb-2"
            >
              <img
                src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/login-google.png"
                alt="icon google"
                className="w-6 mr-2"
              />
              Sign in with Google
            </button>
            <button
              onClick={handleFacebookLogin}
              className="flex items-center font-poppins font-bold text-sm border border-black rounded-md p-2 bg-white"
            >
              <img
                src="https://desafio-03-compass-uol.s3.us-east-2.amazonaws.com/static-images/login-facebook.png"
                alt="icon facebook"
                className="w-6 mr-2"
              />
              Sign in with Facebook
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Login;
