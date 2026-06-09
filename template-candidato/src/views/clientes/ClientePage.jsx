import Table from "../../components/table/Table.jsx";
import { formatPhoneNumber } from "../../utils/function";
import { useClienteViewModel } from "../../viewmodels/useClienteViewModel";

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
    render: row => formatPhoneNumber(row.telefone)
  }
];

export default function ClientePage() {
  const { clientes, loading, salvar } = useClienteViewModel();

  return (
    <div>
      {loading ? (<p>Carregando...</p>) : (
        <Table page={"Clientes"} columns={columns} data={clientes}></Table>
      )}
    </div>
  );
}