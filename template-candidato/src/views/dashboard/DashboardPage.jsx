import { useEffect } from "react";
import { useOrdemServicoViewModel } from "../../viewmodels/useOrdemServicoViewModel";
import { getNumberFormat } from "../../utils/function";
import "./Dashboard.css";
import PieChart from "../../components/chart/PieChart";
import BarChart from "../../components/chart/BarChart";
import { FaSync } from "react-icons/fa";

export default function DashboardPage() {
  const { dashboard, quantidade, faturamento, error, getValores, loading, refresh } = useOrdemServicoViewModel();
  const hasData = faturamento?.length > 0 || quantidade?.totalOrdens > 0;

  useEffect(() => {
    getValores();
  }, [getValores]);

  return (
    <div className="card">
      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      <div className="header">
        <h2>Dashboard de Visão geral das Ordens de serviço</h2>

        <button className="button" onClick={() => refresh()}> <FaSync size={15} /> </button>
      </div>

      {loading ? (<p>Carregando...</p>) :
        !hasData ? (
          <div className="empty-state">
            <h3>Nenhum dado encontrado</h3>
            <p>Não existem ordens de serviço para exibir no momento.</p>
          </div>) : (
          <div>
            <div className="dashboard">

              <div className="dashboard-card">
                <h3>Total de Ordens de Serviço</h3>
                <span>{quantidade.totalOrdens}</span>
              </div>

              <div className="dashboard-card">
                <h3>Faturamento</h3>
                <span>{getNumberFormat(quantidade.faturamento)}</span>
              </div>

              <div className="dashboard-card">
                <h3>Taxa de conclusão</h3>
                <span>{quantidade.taxa.toFixed(2)}%</span>
              </div>
            </div>

            <div className="dashboard">
              <div className="chart">
                <PieChart title="Ordem de Serviço por Situação" subtitle="Status" data={dashboard}></PieChart>
              </div>

              <div className="chart">
                <BarChart title="Faturamento por Cliente" subtitle="Faturamento" data={faturamento}></BarChart>
              </div>
            </div>
          </div>)}
    </div>
  );
}