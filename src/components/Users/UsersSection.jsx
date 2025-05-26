import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import "../../App.css";

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
      head: [['ID', 'Nombre', 'Email', 'Edad']],
      body: usuarios.map(u => [u.id, u.nombre, u.email, u.edad]),
    });
    doc.save('usuarios.pdf');
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning mr-2"
          onClick={() => handleEditar(rowData)}
          aria-label="Editar"
          size="small"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger mr-2"
          onClick={() => handleEliminar(rowData.id)}
          aria-label="Eliminar"
          size="small"
        />
        <Button
          icon="pi pi-file-pdf"
          className="p-button-rounded p-button-success"
          onClick={exportarPDF}
          aria-label="Exportar PDF"
          size="small"
        />
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>

      <form onSubmit={handleSubmit} className="mb-4 space-y-2 flex flex-col items-center max-w-sm mx-auto">
        <InputText
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full mb-2"
          required
        />
        <InputText
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-2"
          required
        />
        <InputText
          type="number"
          name="edad"
          placeholder="Edad"
          value={form.edad}
          onChange={handleChange}
          className="w-full mb-4"
          required
        />
        <Button
          label={editandoId ? 'Actualizar' : 'Agregar'}
          icon="pi pi-user-plus"
          className="mi-boton-azul w-full"
          type="submit"
        />
      </form>

      <DataTable
        value={usuarios}
        className="mt-4"
        responsiveLayout="scroll"
        emptyMessage="No hay usuarios para mostrar"
        tableStyle={{ minWidth: '90rem' }}
      >
        <Column field="nombre" header="Nombre" />
        <Column field="email" header="Email" />
        <Column field="edad" header="Edad" />
        <Column header="Acciones" body={actionBodyTemplate} style={{ minWidth: '20px' }} />
      </DataTable>

      <div className="flex justify-center mt-6">
        <Button 
          label="Volver" 
          icon="pi pi-arrow-left" 
          className="p-button-secondary" 
          onClick={() => window.location.href = '/'} 
        />
      </div>
    </div>
  );
}

export default UsersSection;
