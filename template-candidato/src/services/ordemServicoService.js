import { supabase } from './supabaseClient';

export const OrdemServicoService = {
    // async get(search = "", status = "", page = 0, pageSize = 10) {
    //     const from = page * pageSize;
    //     const to = from + pageSize - 1;

    //     let query = supabase.from("ordens_servico").select("*, cliente:clientes (id, nome)", { count: "exact" });

    //     if (search.length >= 3) {
    //         query = query.or(`descricao.ilike.%${search}%,cliente.nome.ilike.%${search}%`);
    //     }

    //     if (status) {
    //         query = query.eq("status", status);
    //     }

    //     const { data, error, count } = await query.order("id", { ascending: false }).range(from, to);

    //     if (error) throw error;

    //     return { data, count };
    // },

    async get(search = "", status = "", page = 0, pageSize = 10) {
        const from = page * pageSize;
        const to = from + pageSize - 1;

        let clienteIds = [];

        let query = supabase.from("ordens_servico").select("*, cliente:clientes (id, nome)", { count: "exact" });

        if (search.length >= 3) {
            const { data: clientes } = await supabase.from("clientes").select("id").ilike("nome", `%${search}%`);
            clienteIds = clientes?.map(c => c.id) || [];

            query = query.or(`descricao.ilike.%${search}%,cliente_id.in.(${clienteIds.join(",")})`);
        }

        if (status) {
            query = query.eq("status", status);
        }

        const { data, error, count } = await query
            .order("id", { ascending: false })
            .range(from, to);

        if (error) throw error;

        return { data, count };
    },

    async getById(id) {
        const { data, error } = await supabase.from("ordens_servico").select("*").eq("id", id).single();

        if (error) throw error;

        return data;
    },

    async getTotalOrdens(status) {
        const { count, error } = await supabase.from("ordens_servico").select("*", { count: "exact", head: true });

        if (error) throw error;

        return count;
    },

    async getTotalByStatus(status) {
        const { count, error } = await supabase.from("ordens_servico").select("*", { count: "exact", head: true }).eq("status", status);

        if (error) throw error;

        return count;
    },

    async getTotal() {
        const { data, error } = await supabase.rpc("get_faturamento_total");

        if (error) throw error;

        return data;
    },

    async getTotalByCliente() {
        const { data, error } = await supabase.rpc("get_faturamento_por_cliente");

        if (error) throw error;

        return data;
    },

    async post(ordem) {
        const { error } = await supabase.from("ordens_servico").insert({
            ...ordem,
            status: "P"
        });

        if (error) throw error;
    },

    async put(id, ordem) {
        const { error } = await supabase.from("ordens_servico").update(ordem).eq("id", id);

        if (error) throw error;
    },

    async updateStatus(id, status) {
        const { error } = await supabase.from("ordens_servico").update({ status }).eq("id", id);

        if (error) throw error;
    }
};