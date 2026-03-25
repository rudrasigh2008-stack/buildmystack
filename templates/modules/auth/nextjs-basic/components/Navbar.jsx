'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsAuthenticated(false);
    router.push('/login');
    router.refresh();
  };

  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '15px', borderBottom: '1px solid #ccc', background: '#f8f9fa' }}>
      <Link href="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Home</Link>
      {isAuthenticated ? (
        <>
          <Link href="/dashboard" style={{ textDecoration: 'none', color: '#333' }}>Dashboard</Link>
          <button onClick={handleLogout} style={{ marginLeft: 'auto', cursor: 'pointer', border: 'none', background: 'transparent', color: 'red', fontSize: '16px' }}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login" style={{ textDecoration: 'none', color: '#333', marginLeft: 'auto' }}>Login</Link>
          <Link href="/register" style={{ textDecoration: 'none', color: '#333' }}>Register</Link>
        </>
      )}
    </nav>
  );
}
