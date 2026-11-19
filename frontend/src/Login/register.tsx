import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { composeError } from '../Utils/handleError.tsx';
import './register.css'
import { PasswordField, UsernameField, useImputsHooks } from '../Utils/LoginForm/UsernameImputs.tsx';

const Login: React.FC = () => {
  const form = useImputsHooks();
  const {password, username} = form;
  const [email, setEmail] = useState<null | string>(null);
  const [emailError, setEmailError] = useState<null | string>(null);
  const [emailMessage, setEmailMessage] = useState<null | string>(null);
  const [emailLoading, setEmailLoading] = useState<true | false>(false)
  const [error, setError] = useState<null | string>(null);
  const [mode, setMode] = useState<string>("dark");
  const [user, setUser] = useState<string>("");
  const [loading, setLoading] = useState<true | false>(false)
  const navigate = useNavigate();
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    axios.get('http://localhost:8000/login', {
      auth: {
        username: `${username}`,
        password: `${password}`
      }
      })
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error)
        setError(composeError(error))
        setLoading(false);
      });
  };

  const handlePasswordRefresh = async () => {

    setEmailError("");
    setEmailLoading(true);
    axios.get('http://localhost:8000/users', {
      params: {
        username: `${email}`
      }
      })
      .then(response => {
        setEmailMessage(response.data);
        setEmailLoading(false);
      })
      .catch(error => {
        setEmailError(error.message);
        setEmailLoading(false);
      });
    };

  const filterEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === null){
      setEmail('');
      return;
    }

    const emailCheck = /^.+@.+\..+$/g;

    if (emailCheck.test(email)){
      handlePasswordRefresh();
    } 
    else{
      setEmailError("Použijte validní email.");
    }
  }

  const handleClick = () => {
    const added = document.body.classList.toggle('dark');

    if (added){
      setMode("dark");
    }
    else{
      setMode("light");
    }
  }

  const rerouteToCreateAccount = () => {
    try {
      navigate('/create_account');
    } catch (error) {
      // Optionally handle navigation errors here, e.g., log or set an error state
      console.error("Navigation error:", error);
    }
  }
  
  
  return (
    <div className="absolute top-0 left-0 bg-background w-screen min-h-screen">
      <div className="mt-[10vh] mx-auto container bg-background-400 text-text-base">
        <h1 className="text-h1 font-extrabold text-center mb-5 text-color-h1">Přihlas se do Zápisků!</h1>
        <p className="my-4">Use default user for development: <span className="font-bold">admin</span> and password: <span className="font-bold">password</span></p>
        <form onSubmit={handleSubmit} autoComplete="on">
          
          <UsernameField form={form} />

          <PasswordField form={form} hideInstructions />

          {/*handling request status and response */}
          {loading && <span className="text-green-600 italic pt-2">loading</span>}
          {error && <p className="error pt-4">{error}</p>}
          <div>{user && <p className="pt-2">"Response: "{user}</p>}</div>
          
          <button className="bg-base hover:bg-base-hover text-white font-bold py-2 px-4 rounded w-full" type="submit">
            Přihlásit se
          </button>
        </form>

        <form onSubmit={filterEmail} autoComplete="on">
          <div id="button-container">
            <button onClick={rerouteToCreateAccount} className="bg-base hover:bg-base-hover text-white font-bold py-2 px-4 rounded w-1/2" type="button">
              Vytvořit nový účet
            </button>
            <button className="bg-base hover:bg-base-hover text-white font-bold py-2 px-4 rounded w-1/2" type="submit">
              Obnovit heslo
            </button>
          </div>
          {(email || email === "") && 
          <div>
            <p>Napište email na který bude posláno nové heslo</p>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              maxLength={20}
              className="m-2 ring-2 focus:ring-base-h dark:ring-neutral-200 my-4"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>}
        </form>

          {/*handling request status and response */}
          {emailLoading && <span className="text-green-600 italic pt-2">loading</span>}
          {emailError && <p className="error pt-4">{emailError}</p>}
          {emailMessage && 
          <div>
            <p className="pt-2">"Email poslán na email: "{email}</p>
            <p className="pt-2">"Odpověď serveru: "{emailMessage}</p>
          </div>}

      </div>
      
      <button
      className="absolute top-1 left-1 bg-base hover:bg-base-hover text-white font-bold py-2 px-4 rounded"
      onClick={handleClick}>
      {`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode`}</button>

    </div>
  );
};

export default Login;