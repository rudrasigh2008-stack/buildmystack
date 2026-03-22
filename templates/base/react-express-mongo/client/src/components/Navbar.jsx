import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '15px', borderBottom: '1px solid #ccc', background: '#f8f9fa' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Home</Link>
      {user ? (
        <>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333' }}>Dashboard</Link>
          <button onClick={handleLogout} style={{ marginLeft: 'auto', cursor: 'pointer', border: 'none', background: 'transparent', color: 'red' }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ textDecoration: 'none', color: '#333', marginLeft: 'auto' }}>Login</Link>
          <Link to="/register" style={{ textDecoration: 'none', color: '#333' }}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
