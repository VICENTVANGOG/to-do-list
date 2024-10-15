import Link from "next/link";
import './navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/agregar">Agregar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
