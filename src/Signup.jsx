import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser, loginUser } from './api/auth';

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signupUser(form);
      console.log('Signup success:', res.data);
      if (res.data.status === 'success') {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { email: form.email, password: form.password };
    try {
      const res = await loginUser(loginData);
      console.log('Login success:', res.data);
      if (res.data.status === 'success') {
        localStorage.setItem('token', res.data.token); 
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>{isLogin ? 'Login' : 'Signup'} Form</h2>
      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        {!isLogin && (
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div style={{ marginTop: 10 }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{ marginLeft: 10 }}
          >
            {isLogin ? 'Go to Signup' : 'Go to Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;