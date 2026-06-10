import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useOrdemServicoViewModel } from "../../viewmodels/useOrdemServicoViewModel";
import "./OrdemServico.css";

export default function OrdemServicoFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ cliente_id: 0, descricao: "", valor: 0, status: "P" });
  const { clientes, getClientes, getById, save, update } = useOrdemServicoViewModel();

  const isPut = !!id;

  useEffect(() => {
    getClientes();

    if (id) {
      carregarOrdem();
    }
  }, [id]);

  async function carregarOrdem() {
    const ordem = await getById(id);

    setForm({
      cliente_id: ordem.cliente_id,
      descricao: ordem.descricao,
      valor: ordem.valor,
      status: ordem.status
    });
  }

  function handleChange(field, value) {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  }

  function validacao() {
    const erros = {};

    if (!form.cliente_id) {
      erros.cliente_id = "Cliente é obrigatório";
    }

    if (!form.descricao.trim()) {
      erros.descricao = "Descrição é obrigatória";
    }

    if (!form.valor) {
      erros.valor = "Valor é obrigatório";
    }

    setErrors(erros);

    return Object.keys(erros).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validacao()) {
      return;
    }

    if (isPut) {
      await update(id, form);
    } else {
      await save(form);
    }

    navigate("/ordens");
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="os-form">
      <div className="form-header">
        <button className="form-button" onClick={() => navigate("/ordens")}><FaArrowLeft></FaArrowLeft></button>

        <h2>ORDEM DE SERVIÇO</h2>

        {isPut && <span>#{id}</span>}
      </div>

      <div className="form-group">
        <label>Cliente</label>

        <select value={form.cliente_id} onChange={(e) => handleChange("cliente_id", e.target.value)} required>
          <option value="">Selecione...</option>

          {clientes.map(cliente => (<option key={cliente.id} value={cliente.id} > {cliente.nome} </option>))}
        </select>
        {errors.cliente_id && (<small className="error"> {errors.cliente_id} </small>)}
      </div>

      <div className="form-group">
        <label>Descrição do problema</label>

        <textarea rows={5} value={form.descricao} onChange={(e) => handleChange("descricao", e.target.value)} required />
        {errors.descricao && (<small className="error"> {errors.descricao} </small>)}
      </div>

      <div className="form-group">
        <label>Valor</label>

        <input type="number" step="0.01" min="0" value={form.valor} onChange={(e) => handleChange("valor", e.target.value)} required />
        {errors.valor && (<small className="error"> {errors.valor} </small>)}
      </div>

      <div className="form-group">
        <label>Situação</label>

        <input value={form.status} readOnly />
      </div>

      <div className="form-actions">
        <button className="form-button" type="submit"> {isPut ? "Salvar" : "Cadastrar"}</button>
      </div>
    </form>
  );
}