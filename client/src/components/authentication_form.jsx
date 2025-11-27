import React, { useState } from "react";

export default function AuthForm({ onSubmit, submitLabel = "Sign In" }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ username, password }); }}>
      <label className="block mb-2">Username
        <input value={username} onChange={e => setUsername(e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </label>
      <label className="block mb-2">Password
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </label>
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{submitLabel}</button>
      </div>
    </form>
  );
}
