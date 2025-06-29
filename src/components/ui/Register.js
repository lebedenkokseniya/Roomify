import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password, confirm });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 p-4 border rounded">
      <h2 className="text-xl font-bold">Реєстрація</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2" required />
      </div>
      <div>
        <label>Пароль</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2" required minLength={6} />
      </div>
      <div>
        <label>Підтвердження пароля</label>
        <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full border p-2" required minLength={6} />
      </div>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Зареєструватися</button>
    </form>
  );
}
