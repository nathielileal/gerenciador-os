create table clientes (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    nome text DEFAULT '' NOT NULL,
    email text DEFAULT '' NOT NULL,
    telefone varchar(11) NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    CONSTRAINT clientes_pk PRIMARY KEY (id)
);

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