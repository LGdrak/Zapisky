import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './register.css'
import { EmailField, PasswordField, PasswordFieldAgain, UsernameField, useImputsHooks } from '../Utils/LoginForm/UsernameImputs.tsx';

const CreateAccount: React.FC = () => {
  const form = useImputsHooks();
  const { username, usernameError, emailError, passwordAgainError, passwordError, email, password } = form;
  const [error, setError] = useState<null | string>(null);
  const [mode, setMode] = useState<string>("dark");
  const [user, setUser] = useState<string>("");
  const [loading, setLoading] = useState<true | false>(false)
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if(usernameError === null && emailError === null && passwordError === null && passwordAgainError === null){
      setLoading(true);
      axios.put('http://localhost:8000/create_account', {
        params: {
          username: `${username}`,
          email: `${email}`,
          password: `${password}`
        }
        })
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
    else{
      setError("Formulář není vyplněn správně")
    }
  };

  const handleClick = () => {
    const added = document.body.classList.toggle('dark');

    if (added){
      setMode("dark");
    }
    else{
      setMode("light");
    }
  }

  const rerouteToRegister = () => {
    try {
      navigate('/');
    } catch (error) {
      // Optionally handle navigation errors here, e.g., log or set an error state
      console.error("Navigation error:", error);
    }
  }
  
  return (
    <div className="absolute top-0 left-0 bg-background w-screen min-h-screen">

      <div className="mt-[10vh] mx-auto container bg-background-400 text-text-base">

        <h1 className="text-h1 font-extrabold text-center mb-5 text-color-h1">Vytvoř si nový účet</h1>

        <form onSubmit={handleSubmit} autoComplete="on ">

          <UsernameField form={form} />

          <EmailField form={form} />

          <PasswordField form={form} />

          <PasswordFieldAgain form={form} />

          {/*handling request status and response */}
          {loading && <span className="text-green-600 italic pt-2">loading</span>}
          {error && <p className="error pt-4">{error}</p>}
          <div>{user && <p className="pt-2">"Response: "{user}</p>}</div>
          
          <div>
            <button className="bg-base hover:bg-base-hover text-white font-bold py-2 px-4 rounded w-full" type="submit">
              Vytvořit účet
            </button>
            <button onClick={rerouteToRegister} className="bg-base hover:bg-base-hover text-white font-bold px-4 py-2 rounded w-full" type="button">
              Už mám účet a chci se přihlásit
            </button>
          </div>
        </form>

      </div>
      
      <button
      className="absolute top-1 left-1 bg-base hover:bg-base-hover text-white font-bold py-2 px-4 rounded"
      onClick={handleClick}>
      {`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode`}</button>

    </div>
  );
};

export default CreateAccount;