import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import useAuth from "../../context/useAuth";

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const { login: setAccessToken } = useAuth();
  const [mode, setMode] = useState("dark");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { access_token } = await login(username, password);
      setAccessToken(access_token);
      navigate("/dashboard");
    } catch (err) {
      console.error('Login failed', err);
      setError("Invalid credentials");
    }
  };

  const handleClick = () => {
    if(mode === "dark"){
      setMode("light");
      
      return document.body.classList.add('dark');
    } 
    else{
      setMode("dark");

      return document.body.classList.remove('dark');
    }
  }

  return (
    <div className="login absolute top-0 left-0 bg-neutral-300 dark:bg-linear-to-tr from-indigo-600 to-teal-900 w-screen h-screen">
      <div className="mt-50 mx-auto container bg-neutral-300 dark:bg-linear-to-tr from-teal-700 to-indigo-800 dark:text-neutral-200">
        <h1 className="text-xl font-bold">Login</h1>
        <p className="my-4">Use default user for development: <span className="font-bold">user</span> and password: <span className="font-bold">user</span></p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              className="m-2 focus:ring-2 focus:ring-teal-400 focus:shadow-md focus:shadow-teal-500 ring-2 dark:border-neutral-200"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              className="m-2 focus:ring-2 focus:ring-teal-400 focus:shadow-md focus:shadow-teal-500 ring-2 dark:border-neutral-200"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className="bg-indigo-600 hover:bg-indigo-400 dark:bg-teal-500 dark:hover:bg-teal-400 text-white font-bold py-2 px-4 rounded" type="submit">
            Login
          </button>
        </form>
      </div>
      
      <button
      className="absolute top-1 right-1 bg-indigo-600 hover:bg-indigo-400 dark:bg-teal-500 dark:hover:bg-teal-400 text-white font-bold py-2 px-4 rounded"
      onClick={handleClick}>
      {`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode`}</button>
    </div>
  );
};

export default Login;
