import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClienteFormPage from '../views/clientes/ClienteFormPage';
import OrdemServicoPage from '../views/ordens-servico/OrdemServicoPage';
import OrdemServicoFormPage from '../views/ordens-servico/OrdemServicoFormPage';
import ClientePage from '../views/clientes/ClientePage';
import MainLayout from '../layouts/MainLayout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* ordens */}
          <Route path="/" element={<OrdemServicoPage />} />
          <Route path="/ordens/nova" element={<OrdemServicoFormPage />} />

          {/* clientes */}
          <Route path="/clientes" element={<ClientePage />} />
          <Route path="/clientes/novo" element={<ClienteFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}