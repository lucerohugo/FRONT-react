import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css'; 

function UsersSection() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nombre: '', email: '', edad: '' });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get('/usuarios');
      const data = res.data.data;
      if (Array.isArray(data)) {
        setUsuarios(data);
      } else {
        console.error("Error: la respuesta no contiene un array válido");
        setUsuarios([]);
      }
    } catch (error) {
      console.error("Error al obtener usuarios: ", error);
      setUsuarios([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await axios.put(`/usuarios/${editandoId}`, form);
        setEditandoId(null);
      } else {
        await axios.post('/usuarios', form);
      }
      setForm({ nombre: '', email: '', edad: '' });
      fetchUsuarios();
    } catch (error) {
      console.error("Error al enviar los datos del formulario: ", error);
    }
  };

  const handleEditar = (usuario) => {
    setForm({ nombre: usuario.nombre, email: usuario.email, edad: usuario.edad });
    setEditandoId(usuario.id);
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`/usuarios/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al eliminar el usuario: ", error);
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      startY: 20,
      head: [['ID','Nombre', 'Email', 'Edad']],
      body: usuarios.map(u => [u.id, u.nombre, u.email, u.edad]),
    });
    doc.save('usuarios.pdf');
  };

  return (
    <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
      

      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={form.edad}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <Button
          label={editandoId ? 'Actualizar' : 'Agregar'}
          icon="pi pi-user-plus"
          className="p-button-primary"
          type="submit"
        />
      </form>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Edad</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(usuarios) && usuarios.map((u) => (
            <tr key={u.id}>
              <td className="border px-4 py-2">{u.nombre}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.edad}</td>
              <td className="border px-4 py-2 space-x-2">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-warning"
                  onClick={() => handleEditar(u)}
                  aria-label="Editar"
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-danger"
                  onClick={() => handleEliminar(u.id)}
                  aria-label="Eliminar"
                />
                <Button
                  icon="pi pi-file-pdf"
                  className="p-button-rounded p-button-success"
                  onClick={exportarPDF}
                  aria-label="Exportar PDF"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersSection;
