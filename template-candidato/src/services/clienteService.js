import { supabase } from './supabaseClient';

export const ClienteService = {
    async get(search = "", page = 0, pageSize = 10) {
        const from = page * pageSize;
        const to = from + pageSize - 1;

        let query = supabase.from("clientes").select("*", { count: "exact" });

        if (search.length >= 3) {
            query = query.ilike("nome", `%${search}%`);
        }

        const { data, error, count } = await query.order("id", { ascending: false }).range(from, to);

        if (error) throw error;

        return { data, count };
    },

    async getList() {
        const { data, error } = await supabase.from("clientes").select("id, nome").order("nome");

        if (error) throw error;

        return data;
    },

    async inserir(cliente) {
        const { error } = await supabase.from('clientes').insert(cliente);

        if (error) throw error;
    }
};