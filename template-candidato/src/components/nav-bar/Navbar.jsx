import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="nav">
            <div className="nav-logo">
                <img src="/hero.png" alt="TecFix" width={20} height={20} /> TecFix
            </div>

            {/* páginas */}
            <NavLink to="/" className="nav-link"> Visão Geral </NavLink>
            <NavLink to="/ordens" className="nav-link"> Ordens de Serviço </NavLink>
            <NavLink to="/clientes" className="nav-link"> Clientes </NavLink>
        </nav>
    );
}