create table clientes (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    nome text DEFAULT '' NOT NULL,
    email text DEFAULT '' NOT NULL,
    telefone varchar(11) NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    CONSTRAINT clientes_pk PRIMARY KEY (id)
);

alter table clientes enable row level security;
create policy "allow_anon_select_clientes" on clientes for select to anon using (true);
create policy "allow_anon_insert_clientes" on clientes for insert to anon with check (true);
create policy "allow_anon_update_clientes" on clientes for update to anon using (true) with check (true);
create policy "allow_anon_delete_clientes" on clientes for delete to anon using (true);

create table ordens_servico (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    cliente_id bigint NOT NULL,
    descricao text DEFAULT '' NOT NULL,
    valor numeric DEFAULT 0 NOT NULL,
    status varchar(1) DEFAULT 'P' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    CONSTRAINT ordens_servico_pk PRIMARY KEY (id),
    CONSTRAINT ordens_cliente_fk FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

alter table ordens_servico enable row level security;
create policy "allow_anon_select_os" on ordens_servico for select to anon using (true);
create policy "allow_anon_insert_os" on ordens_servico for insert to anon with check (true);
create policy "allow_anon_update_os" on ordens_servico for update to anon using (true) with check (true);
create policy "allow_anon_delete_os" on ordens_servico for delete to anon using (true);

create or replace function get_faturamento_total()
returns numeric
language sql
as $$
    select coalesce(sum(ordens_servico.valor), 0) as faturamento
    from ordens_servico
    where ordens_servico.status = 'F';
$$;

create or replace function get_faturamento_por_cliente()
returns table (
  cliente_id bigint,
  cliente_nome text,
  total numeric
)
as $$
  select
    c.id as cliente_id,
    c.nome as cliente_nome,
    sum(o.valor) as total
  from ordens_servico o
  join clientes c on c.id = o.cliente_id
  where o.status = 'F'
  group by c.id, c.nome
  order by total desc;
$$ language sql;

grant execute on function get_faturamento_total() to anon;
grant execute on function get_faturamento_por_cliente() to anon;