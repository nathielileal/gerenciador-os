import { useEffect } from "react";
import { useOrdemServicoViewModel } from "../../viewmodels/useOrdemServicoViewModel";
import { getNumberFormat } from "../../utils/function";
import "./Dashboard.css";
import PieChart from "../../components/chart/PieChart";
import BarChart from "../../components/chart/BarChart";

export default function DashboardPage() {
  const { dashboard, quantidade, faturamento, getValores, loading } = useOrdemServicoViewModel();

  useEffect(() => {
    getValores();
  }, []);

  return (
    <div className="card">
      {loading ? (<p>Carregando...</p>) : (<div>
        <div className="dashboard">

          <div className="dashboard-card">
            <h3>Total de OS</h3>
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