import { useCallback, useEffect, useState } from 'react';
import { ClienteService } from '../services/clienteService';

export function useClienteViewModel() {
    const [loading, setLoading] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);

    const get = useCallback(async (searchValue = search, pageNumber = page) => {
        setLoading(true);

        try {
            const result = await ClienteService.get(searchValue, pageNumber);

            setClientes(result.data ?? []);
            setCount(result.count ?? 0);
        } finally {
            setLoading(false);
        }
    }, [search, page]);

    const onSearch = (value, status) => {
        setSearch(value);
        setPage(0);

        get(value, status, 0);
    };

    const onPageChange = (newPage) => {
        setPage(newPage);

        get(search, '*', newPage);
    };

    const save = useCallback(async (cliente) => {
        await ClienteService.post(cliente);
        await get();
    }, [get]);

    const pages = Math.ceil(count / 10);

    return { clientes, loading, get, save, search, page, onSearch, onPageChange, pages };
}