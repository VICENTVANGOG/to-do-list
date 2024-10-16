import Link from "next/link";
import { FaHome as Home, FaPlus as Plus } from "react-icons/fa"; 
import './navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <img src="https://riwi.io/wp-content/uploads/2023/07/Fondo-claro-logo2-1.png" alt="10px"height={50} width={150} />
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link href="/" className="navbar-item">
              <Home className="navbar-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/agregar" className="navbar-item">
              <Plus className="navbar-icon" />
              <span>Agregar</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
