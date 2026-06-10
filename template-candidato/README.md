# Sistema de Controle de Ordens de Serviço (OS)

Sistema web desenvolvido para gestão de clientes e ordens de serviço de uma assistência técnica, com dashboard analítico, gráficos e integração completa com Supabase.

## 🚀 Tecnologias utilizadas

Front-end:

- React JS (Vite)
- React Router DOM
- ECharts (gráficos)
- CSS puro

Back-end:

- Supabase (PostgreSQL)

## 📌 Funcionalidades

   ### 📊 Dashboard

   - Total de ordens de serviço
   - Faturamento total (status finalizado)
   - Taxa de conclusão (% finalizadas)
   - OS por status (gráfico de pizza)
   - Faturamento por cliente (gráfico de barras)

   ### 👤 Gestão de Clientes

   - Listagem de clientes
   - Cadastro de clientes
   - Validação básica de formulário (nome, email, telefone)

   ### 🧾 Gestão de Ordens de Serviço

   - Listagem com paginação
   - Filtro por status
   - Busca por:
      - descrição da OS
      - nome do cliente
   - Cadastro de OS
   - Atualização de status (Pendente → Em andamento → Finalizada → Cancelada)
   - Relacionamento com clientes

## 📊 Status da OS

| Código | Status         |
|--------|----------------|
| P      | Pendente       |
| A      | Em andamento   |
| F      | Finalizada     |
| C      | Cancelada      |

## 🗄️ Estrutura do Banco de Dados

**clientes**

- id
- nome
- email
- telefone
- created_at

**ordens_servico**

- id
- cliente_id (FK)
- descricao
- valor
- status
- created_at

## ⚙️ Funções SQL (Supabase RPC)

### 📈 Faturamento total
   ```bash
   get_faturamento_total()
   ```

### 👥 Faturamento por cliente
   ```bash
   get_faturamento_por_cliente()
   ```

## 🧠 Arquitetura do Frontend

- ViewModel pattern para lógica de estado
- Services separados para Supabase
- Componentização reutilizável (Table, Charts, Cards)
- Hooks personalizados
- Separação de responsabilidades (UI × lógica × dados)

## 🚀 Como Executar o Projeto

1. **Clonar o repositório**
   ```bash
   git clone <repo-url>
   cd template-candidato
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configurar Supabase**
   Criar arquivo .env:
   ```bash
   VITE_SUPABASE_URL=your-url
   VITE_SUPABASE_ANON_KEY=your-key  
   ```

4. **Rodar projeto**
   ```bash
   npm run dev
   ```

## Observações

Sistema desenvolvido como parte de um desafio técnico Fullstack utilizando React + Supabase.
