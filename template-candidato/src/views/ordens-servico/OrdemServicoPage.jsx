import { useOrdemServicoViewModel } from "../../viewmodels/useOrdemServicoViewModel";
import { convertTextSituacaoOrdem } from "../../utils/convert.js"
import { getNumberFormat } from "../../utils/function.js"
import "./OrdemServico.css";
import Table from "../../components/table/Table.jsx";

const columns = [
    {
        key: "id",
        title: "#"
    },
    {
        key: "cliente_id",
        title: "Cliente"
    },
    {
        key: "descricao",
        title: "Descrição"
    },
    {
        key: "valor",
        title: "Valor",
        render: row => getNumberFormat(row.valor)
    },
    {
        key: "status",
        title: "Situação",
        render: row => (
            <span className={`status status-${row.status}`}>
                {convertTextSituacaoOrdem(row.status)}
            </span>
        )
    }
];

export default function OrdemServicoPage() {
    const { ordem, loading, salvar } = useOrdemServicoViewModel();

    return (
        <div>
            {loading ? (<p>Carregando...</p>) : (
                <Table page={"Ordens de Serviço"} columns={columns} data={ordem}></Table>
            )}
        </div>
    );
}