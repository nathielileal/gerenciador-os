import { useOrdemServicoViewModel } from "../../viewmodels/useOrdemServicoViewModel";
import { convertColorSituacaoOrdem, convertTextNovaSituacaoOrdem, convertTextSituacaoOrdem } from "../../utils/convert.js"
import { getNumberFormat } from "../../utils/function.js"
import "./OrdemServico.css";
import Table from "../../components/table/Table.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaExchangeAlt } from "react-icons/fa";

const columns = [
    {
        key: "id",
        title: "#"
    },
    {
        key: "cliente",
        title: "Cliente",
        render: row => row.cliente?.nome
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
        render: row => (<ContainerSituacao status={row.status}> {convertTextSituacaoOrdem(row.status)} </ContainerSituacao>)
    }
];

export function ContainerSituacao({ status, children }) {
    return (<span className={`status status-${status}`} style={{ backgroundColor: convertColorSituacaoOrdem(status) }}> {children} </span>);
}

export function getNewStatus(status) {
    switch (status) {
        case "P":
            return "A";

        case "A":
            return "F";

        default:
            return "C";
    }
}

export default function OrdemServicoPage() {
    const navigate = useNavigate();
    const { ordens, loading, get, changeStatus, onSearch, onPageChange, page, pages } = useOrdemServicoViewModel();

    function handleEdit(id) {
        navigate(`/ordens/${id}`);
    }

    function handleAdd() {
        navigate("/ordens/nova");
    }

    async function handleChangeStatus(id, status) {
        await changeStatus(id, getNewStatus(status));
    }

    useEffect(() => {
        get("");
    }, [get]);

    return (
        <div>
            <Table
                page="Ordens de Serviço"
                columns={columns}
                data={ordens}
                onSearch={onSearch}
                onPageChange={onPageChange}
                currentPage={page}
                pages={pages}
                loading={loading}
                hasFilter={true}
                onAdd={handleAdd}
                onEdit={handleEdit}
                hasChange={(row) => row.status != 'C' && getNewStatus(row.status) != 'C'}
                onChangeOption={(row) => <button className="button-change" style={{ backgroundColor: convertColorSituacaoOrdem(getNewStatus(row.status)) }} onClick={() => handleChangeStatus(row.id, row.status)} >
                    <FaExchangeAlt className="icon" />
                    {convertTextNovaSituacaoOrdem(getNewStatus(row.status))}
                </button>}
                hasDelete={(row) => row.status != 'C'}
                onDelete={handleChangeStatus}
            />
        </div>
    );
}