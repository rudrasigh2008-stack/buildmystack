import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '15px', borderBottom: '1px solid #ccc', background: '#f8f9fa' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Home</Link>
    </nav>
  );
};

export default Navbar;
