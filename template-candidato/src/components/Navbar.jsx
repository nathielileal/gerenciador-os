import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav style={{ display: 'flex', gap: '12px', padding: '16px', borderBottom: '1px solid #ddd' }}>
            <NavLink to="/"> Ordens de Serviço </NavLink>
            <NavLink to="/clientes"> Clientes </NavLink>
        </nav>
    );
}