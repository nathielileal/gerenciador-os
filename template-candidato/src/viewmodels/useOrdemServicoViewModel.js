import { useEffect, useState } from 'react';
import { OrdemServicoService } from '../services/ordemServicoService';

export function useOrdemServicoViewModel() {
    const [ordem, setOrdem] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        carregarOrdem();
    }, []);

    async function carregarOrdem() {
        setLoading(true);

        try {
            const data = await OrdemServicoService.listar();
            
            setOrdem(data);
        } finally {
            setLoading(false);
        }
    }

    async function salvar(ordem) {
        await OrdemServicoService.inserir(ordem);
        await carregarOrdem();
    }

    return { ordem, loading, salvar };
}