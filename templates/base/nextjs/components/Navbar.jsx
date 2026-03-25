import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '15px', borderBottom: '1px solid #ccc', background: '#f8f9fa' }}>
      <Link href="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Home</Link>
    </nav>
  );
}
