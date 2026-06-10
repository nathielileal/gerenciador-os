import { useCallback, useEffect, useState } from 'react';
import { ClienteService } from '../services/clienteService';

export function useClienteViewModel() {
    const [loading, setLoading] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState(null);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);

    const [error, setError] = useState(null);

    const handleError = (err) => {
        const message = err?.message || "Erro inesperado. Tente novamente.";

        setError(message);
    };

    const get = useCallback(async (searchValue = search, pageNumber = page) => {
        setLoading(true);

        try {
            const result = await ClienteService.get(searchValue, pageNumber);

            setClientes(result.data ?? []);
            setCount(result.count ?? 0);
        } catch (err) {
            handleError(err);
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
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const refresh = async () => {
        await Promise.all([get()]);
    };

    const save = useCallback(async (cliente) => {
        setLoading(true);

        try {
            await ClienteService.post(cliente);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const update = useCallback(async (id, cliente) => {
        setLoading(true);

        try {
            await ClienteService.put(id, cliente);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const pages = Math.ceil(count / 10);

    return { clientes, cliente, error, loading, get, getById, save, update, refresh, search, page, onSearch, onPageChange, pages };
}