import { useCallback, useEffect, useState } from 'react';
import { ClienteService } from '../services/clienteService';

export function useClienteViewModel() {
    const [loading, setLoading] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState(null);

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

    const onSearch = (value) => {
        setSearch(value);
        setPage(0);

        get(value, 0);
    };

    const onPageChange = (newPage) => {
        setPage(newPage);

        get(search, newPage);
    };

    const getById = useCallback(async (id) => {
        setLoading(true);

        try {
            const data = await ClienteService.getById(id);

            setCliente(data);

            return data;
        } finally {
            setLoading(false);
        }
    }, []);

    const save = useCallback(async (cliente) => {
        await ClienteService.post(cliente);
    }, []);

    const update = useCallback(async (id, cliente) => {
        await ClienteService.put(id, cliente);
    }, []);


    const pages = Math.ceil(count / 10);

    return { clientes, cliente, loading, get, getById, save, update, search, page, onSearch, onPageChange, pages };
}