// src/components/Form.jsx
import axios from "axios";
import { useState } from "react";

const Form = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // Estado para a mensagem

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        user
      );

      console.log("User added:", response.data);
      setMessage(`Usuário ${response.data.name} adicionado com sucesso!`); // Mensagem de sucesso

      // Limpa os inputs
      setUser({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("Erro ao adicionar usuário."); // Mensagem de erro
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="name" className="form-label text-light">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          value={user.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label text-light">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control"
          value={user.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label text-light">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          value={user.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>

      {/* Exibir a mensagem abaixo do botão */}
      {message && (
        <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px' }}>
          {message}
        </p>
      )}
    </form>
  );
};

export default Form;

