import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 p-4 border rounded">
      <h2 className="text-xl font-bold">Вхід</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2" required />
      </div>
      <div>
        <label>Пароль</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2" required minLength={6} />
      </div>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Увійти</button>
    </form>
  );
}
