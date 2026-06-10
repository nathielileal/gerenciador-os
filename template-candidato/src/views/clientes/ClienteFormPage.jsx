import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useClienteViewModel } from "../../viewmodels/useClienteViewModel";
import "./Cliente.css";
import { getPhoneFormat, isTelefoneValido } from "../../utils/function";

export default function ClienteFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });
  const { getById, save, update, loading } = useClienteViewModel();

  const isPut = !!id;

  useEffect(() => {
    if (id) {
      carregarCliente();
    }
  }, [id]);

  async function carregarCliente() {
    const cliente = await getById(id);

    setForm({
      nome: cliente.nome ?? "",
      email: cliente.email ?? "",
      telefone: getPhoneFormat(cliente.telefone ?? "")
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

    if (!form.nome.trim()) {
      erros.nome = "Nome é obrigatório.";
    }

    if (!form.email.trim()) {
      erros.email = "E-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      erros.email = "E-mail inválido!";
    }

    if (!form.telefone.trim()) {
      erros.telefone = "Telefone é obrigatório.";
    } else if (!isTelefoneValido(form.telefone)) {
      erros.telefone = "Telefone inválido!";
    }

    setErrors(erros);

    return Object.keys(erros).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validacao()) {
      return;
    }

    const c = { ...form, telefone: form.telefone.replace(/\D/g, "") };

    if (isPut) {
      await update(id, c);
    } else {
      await save(c);
    }

    navigate("/clientes");
  }

  return (
    <div className="card">
      <form className="cliente-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <button type="button" className="form-button" onClick={() => navigate("/clientes")}>
            <FaArrowLeft />
          </button>

          <h2>CLIENTE</h2>

          {isPut ? <span>#{id}</span> : <span />}
        </div>

        <div className="form-group">
          <label>Nome</label>

          <input value={form.nome} onChange={(e) => handleChange("nome", e.target.value)} required />
          {errors.nome && (<small className="error"> {errors.nome} </small>)}
        </div>

        <div className="form-group">
          <label>E-mail</label>

          <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="exemplo@dominio.com" required />

          {errors.email && (<small className="error"> {errors.email} </small>)}
        </div>

        <div className="form-group">
          <label>Telefone</label>

          <input value={form.telefone} onChange={(e) => handleChange("telefone", getPhoneFormat(e.target.value))} placeholder="(41) 99999-9999" required />

          {errors.telefone && (<small className="error"> {errors.telefone} </small>)}
        </div>

        <div className="form-actions">
          <button className="form-button" type="submit" > {isPut ? "Salvar" : "Cadastrar"} </button>
        </div>
      </form>
    </div>
  );
}