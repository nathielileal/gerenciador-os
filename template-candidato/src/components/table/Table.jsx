import { FaFilter, FaPencil, FaTrashCan, FaX, FaXmark } from "react-icons/fa6";
import "./Table.css";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaExchangeAlt, FaPlusSquare, FaSearch, FaSync, FaWindowClose } from "react-icons/fa";
import { useEffect, useState } from "react";
import { convertColorSituacaoOrdem, convertTextNovaSituacaoOrdem } from "../../utils/convert";
import { getNewStatus } from "../../views/ordens-servico/OrdemServicoPage";

export default function Table({ page, columns, data, onSearch, onPageChange, currentPage, pages, loading, refresh, hasFilter, onAdd, onEdit, hasChange, onChangeOption, onDelete, hasDelete }) {
    const [search, setSearch] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [filter, setFilter] = useState("");
    const hasData = data && data.length > 0;

    function handleChange(value) {
        setSearch(value);

        if (value.length === 0 || value.length >= 3) {
            onSearch(value, filter);
        }
    }

    function nextPage() {
        if (currentPage + 1 >= pages) return;

        onPageChange(currentPage + 1);
    }

    function prevPage() {
        if (currentPage === 0) return;

        onPageChange(currentPage - 1);
    }

    return (
        <div className="table-card">
            <div className="table-header">
                <h2>{page}</h2>
                <div className="table-options">
                    <div className="table-search">
                        <input className="table-input" value={search} onChange={(e) => handleChange(e.target.value)} placeholder="Buscar..." />
                        <FaSearch className="icon" size={15} />
                    </div>

                    {hasFilter && (<button className="table-button" onClick={() => setShowFilter(!showFilter)}> <FaFilter className="icon" size={15} /> Filtrar </button>)}

                    {showFilter && (
                        <div className="filter-popup">
                            <div className="filter-header">
                                <span>Filtros</span>

                                <button className="button-close" onClick={() => setShowFilter(false)}> <FaXmark></FaXmark> </button>
                            </div>

                            <label>Situação</label>

                            <select value={filter} onChange={(e) => {
                                const value = e.target.value;

                                setFilter(value);
                                onSearch(search, value);
                            }}
                            >
                                <option value="">Todas</option>
                                <option value="P">Pendente</option>
                                <option value="A">Em andamento</option>
                                <option value="F">Finalizada</option>
                                <option value="c">Cancelada</option>
                            </select>
                        </div>
                    )}

                    <button className="table-button" onClick={() => onAdd()}> <FaPlusSquare className="icon" size={15} /> Novo </button>
                    <button className="table-button" onClick={() => refresh()}> <FaSync size={15} /> </button>

                    <div className="table-page">
                        Página {currentPage + 1} / {pages || 1}
                        <div className="table-options">
                            <button className="table-page-button" onClick={prevPage}> <FaAngleDoubleLeft className="icon-page" size={10} /> </button>
                            <button className="table-page-button" onClick={nextPage}> <FaAngleDoubleRight className="icon-page" size={10} /> </button>
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (<p>Carregando dados...</p>) :
                !hasData ? (
                    <div className="empty-state">
                        <h3>Nenhum dado encontrado</h3>
                        <p>Não existem ordens de serviço para exibir no momento.</p>
                    </div>) : (
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    {columns.map(column => (<th key={column.key}> {column.title} </th>))}
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map(row => (
                                    <tr key={row.id}>
                                        {columns.map(column => (
                                            <td key={column.key}>
                                                {column.render ? column.render(row) : row[column.key]}
                                            </td>
                                        ))}
                                        <td>
                                            <button className="button-edit" onClick={() => onEdit(row.id)}> <FaPencil /> </button>

                                            {hasChange(row) && onChangeOption(row)}

                                            {hasDelete(row) && (<button className="button-delete" onClick={() => onDelete(row.id, 'C')} ><FaXmark className="icon" /> CANCELAR</button>)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        </div>
    );
}