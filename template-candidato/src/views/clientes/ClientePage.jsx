import { useNavigate } from "react-router-dom";
import Table from "../../components/table/Table.jsx";
import { getPhoneFormat } from "../../utils/function.js";
import { useClienteViewModel } from "../../viewmodels/useClienteViewModel";
import { useEffect } from "react";
import './Cliente.css';

const columns = [
  {
    key: "id",
    title: "#"
  },
  {
    key: "nome",
    title: "Nome"
  },
  {
    key: "email",
    title: "Email"
  },
  {
    key: "telefone",
    title: "Telefone",
    render: row => getPhoneFormat(row.telefone)
  }
];

export default function ClientePage() {
  const navigate = useNavigate();
  const { clientes, error, loading, refresh, save, get, onSearch, onPageChange, page, pages } = useClienteViewModel();

  function handleEdit(id) {
    navigate(`/clientes/${id}`);
  }

  function handleAdd() {
    navigate("/clientes/novo");
  }

  useEffect(() => {
    get("");
  }, [get]);

  return (
    <div>
      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      <Table
        page="Clientes"
        columns={columns}
        data={clientes}
        onSearch={onSearch}
        onPageChange={onPageChange}
        currentPage={page}
        pages={pages}
        loading={loading}
        refresh={refresh}
        onAdd={handleAdd}
        onEdit={handleEdit}
        hasChange={() => false}
        hasDelete={() => false}
      />
    </div>
  );
}