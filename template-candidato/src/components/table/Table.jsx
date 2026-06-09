import "./Table.css";

export default function Table({ page, columns, data }) {
    return (
        <div className="table-card">
            <div className="table-header">
                <h2>{page}</h2>
                <button>Novo</button>
            </div>

            <table className="table">
                <thead>
                    <tr> {columns.map(column => (<th key={column.key}> {column.title} </th>))} </tr>
                </thead>

                <tbody>
                    {data.map(row => (
                        <tr key={row.id}>
                            {columns.map(column => (
                                <td key={column.key}>
                                    {column.render ? column.render(row) : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}