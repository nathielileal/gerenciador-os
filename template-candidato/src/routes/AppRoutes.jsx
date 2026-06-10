import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClienteFormPage from '../views/clientes/ClienteFormPage';
import OrdemServicoPage from '../views/ordens-servico/OrdemServicoPage';
import OrdemServicoFormPage from '../views/ordens-servico/OrdemServicoFormPage';
import ClientePage from '../views/clientes/ClientePage';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../views/dashboard/DashboardPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />

          {/* ordens */}
          <Route path="/ordens" element={<OrdemServicoPage />} />
          <Route path="/ordens/nova" element={<OrdemServicoFormPage />} />
          <Route path="/ordens/:id" element={<OrdemServicoFormPage />} />

          {/* clientes */}
          <Route path="/clientes" element={<ClientePage />} />
          <Route path="/clientes/novo" element={<ClienteFormPage />} />
          <Route path="/clientes/:id" element={<ClienteFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}