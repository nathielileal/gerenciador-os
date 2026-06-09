import { supabase } from './supabaseClient';

export const OrdemServicoService = {
    async listar() {
        const { data, error } = await supabase.from('ordens_servico').select('*').order('id');

        if (error) throw error;

        return data;
    },

    async inserir(ordem) {
        const { error } = await supabase.from('ordens_servico').insert(ordem);

        if (error) throw error;
    }
};