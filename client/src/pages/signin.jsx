import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/authentication_form";
import { login } from "../services/api";

export default function SignIn({ onSignIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async ({ username, password }) => {
    try {
      const data = await login(username, password);
      if (data?.token) {
        localStorage.setItem("token", data.token);
        onSignIn({ username: data.username || username });
        navigate("/");
      } else {
        throw new Error("No token returned");
      }
    } catch (e) {
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
      <div className="bg-white p-6 rounded shadow">
        <AuthForm onSubmit={handleLogin} />
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </div>
    </div>
  );
}
