import { useEffect, useState } from 'react';
import { ClienteService } from '../services/clienteService';

export function useClienteViewModel() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        carregarClientes();
    }, []);

    async function carregarClientes() {
        setLoading(true);

        try {
            const data = await ClienteService.listar();
            
            setClientes(data);
        } finally {
            setLoading(false);
        }
    }

    async function salvar(cliente) {
        await ClienteService.inserir(cliente);
        await carregarClientes();
    }

    return { clientes, loading, salvar };
}