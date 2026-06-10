import { useCallback, useEffect, useState } from 'react';
import { OrdemServicoService } from '../services/ordemServicoService';
import { ClienteService } from '../services/clienteService';
import { convertColorSituacaoOrdem } from '../utils/convert';

export function useOrdemServicoViewModel() {
    const [loading, setLoading] = useState(false);
    const [ordens, setOrdens] = useState([]);

    const [clientes, setClientes] = useState([]);
    const [ordem, setOrdem] = useState(null);

    const [dashboard, setDashboard] = useState([]);
    const [faturamento, setFaturamento] = useState([]);
    const [quantidade, setQuantidade] = useState({ totalOrdens: 0, faturamento: 0, taxa: 0 });

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);

    const get = useCallback(async (searchValue = search, situacao = status, pageNumber = page) => {
        setLoading(true);

        try {
            const result = await OrdemServicoService.get(searchValue, situacao, pageNumber);

            setOrdens(result.data ?? []);
            setCount(result.count ?? 0);
        } finally {
            setLoading(false);
        }
    }, [search, page]);

    const onSearch = (value, status) => {
        setSearch(value);
        setStatus(status);
        setPage(0);

        get(value, status, 0);
    };

    const onPageChange = (newPage) => {
        setPage(newPage);

        get(search, '*', newPage);
    };

    const getById = useCallback(async (id) => {
        setLoading(true);

        try {
            const data = await OrdemServicoService.getById(id);

            setOrdem(data);

            return data;
        } finally {
            setLoading(false);
        }
    }, []);

    const getClientes = useCallback(async () => {
        const data = await ClienteService.getList();

        setClientes(data ?? []);

        return data;
    }, []);

    const getValores = useCallback(async () => {
        setLoading(true);

        try {
            const [totalOrdens, pendentes, andamento, finalizadas, canceladas, faturamento, fc] = await Promise.all([
                OrdemServicoService.getTotalOrdens(),
                OrdemServicoService.getTotalByStatus("P"),
                OrdemServicoService.getTotalByStatus("A"),
                OrdemServicoService.getTotalByStatus("F"),
                OrdemServicoService.getTotalByStatus("C"),
                OrdemServicoService.getTotal(),
                OrdemServicoService.getTotalByCliente(),
            ]);

            setQuantidade({ totalOrdens, faturamento, taxa: (finalizadas / totalOrdens) * 100 });
            setDashboard([
                { name: "Pendentes", value: Number(pendentes) || 0, itemStyle: { color: convertColorSituacaoOrdem("P") } },
                { name: "Em andamento", value: Number(andamento) || 0, itemStyle: { color: convertColorSituacaoOrdem("A") } },
                { name: "Finalizadas", value: Number(finalizadas) || 0, itemStyle: { color: convertColorSituacaoOrdem("F") } },
                { name: "Canceladas", value: Number(canceladas) || 0, itemStyle: { color: convertColorSituacaoOrdem("C") } }
            ]);
            setFaturamento((fc ?? []).map((item) => ({
                name: item.cliente_nome,
                value: Number(item.total) || 0
            })));
        } finally {
            setLoading(false);
        }
    }, []);

    const save = useCallback(async (ordem) => {
        await OrdemServicoService.post(ordem);
    }, []);

    const update = useCallback(async (id, ordem) => {
        await OrdemServicoService.put(id, ordem);
    }, []);

    const changeStatus = useCallback(async (id, status) => {
        await OrdemServicoService.updateStatus(id, status);
        await get();
    }, [get]);

    const pages = Math.ceil(count / 10);

    return { ordens, ordem, clientes, dashboard, quantidade, faturamento, loading, get, getById, getClientes, getValores, save, update, changeStatus, search, page, pages, onSearch, onPageChange };
}