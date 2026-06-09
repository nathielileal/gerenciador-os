import { supabase } from './supabaseClient';

export const ClienteService = {
    async listar() {
        const { data, error } = await supabase.from('clientes').select('*').order('id');

        if (error) throw error;

        return data;
    },

    async inserir(cliente) {
        const { error } = await supabase.from('clientes').insert(cliente);

        if (error) throw error;
    }
};