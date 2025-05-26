import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from 'primereact/button';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import "../../App.css";


function ProductsSection() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '' });
  const [editandoId, setEditandoId] = useState(null);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await axios.get('/productos');
      const data = res.data.data;
      if (Array.isArray(data)) {
        setProductos(data);
        const treeNodes = data.map((p) => ({
          key: p.id.toString(),
          data: { nombre: p.nombre, precio: p.precio, id: p.id },
          children: [],
        }));
        setNodes(treeNodes);
      } else {
        setProductos([]);
        setNodes([]);
      }
    } catch (error) {
      console.error("Error al obtener productos: ", error);
      setProductos([]);
      setNodes([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await axios.put(`/productos/${editandoId}`, form);
        setEditandoId(null);
      } else {
        await axios.post('/productos', form);
      }
      setForm({ nombre: '', precio: '' });
      fetchProductos();
    } catch (error) {
      console.error("Error al enviar los datos del formulario: ", error);
    }
  };

  const handleEditar = (producto) => {
    setForm({ nombre: producto.nombre, precio: producto.precio });
    setEditandoId(producto.id);
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`/productos/${id}`);
      fetchProductos();
    } catch (error) {
      console.error("Error al eliminar el producto: ", error);
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      startY: 20,
      head: [['ID', 'Nombre', 'Precio']],
      body: productos.map(p => [p.id, p.nombre, p.precio]),
    });
    doc.save('productos.pdf');
  };

  const actionBodyTemplate = (nodeData) => {
    const producto = { id: nodeData.data.id, nombre: nodeData.data.nombre, precio: nodeData.data.precio };
    return (
      <div className="flex">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning mr-2"
          onClick={() => handleEditar(producto)}
          aria-label="Editar"
          size="small"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger mr-2"
          onClick={() => handleEliminar(producto.id)}
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
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>

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
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="w-full mb-4"
          required
        />
        <Button
          label={editandoId ? 'Actualizar' : 'Agregar'}
          icon="pi pi-shopping-cart"
          className="mi-boton-azul w-full"
          type="submit"
        />
      </form>

      <TreeTable
        value={nodes}
        className="mt-4"
        tableStyle={{ minWidth: '90rem' }}
      >
        <Column field="nombre" header="Nombre" expander></Column>
        <Column field="precio" header="Precio" body={(node) => `$${node.data.precio}`}></Column>
        <Column header="Acciones" body={actionBodyTemplate}></Column>
      </TreeTable>

      <div className="flex justify-center mt-6">
        <Button label="Volver" icon="pi pi-arrow-left" className="p-button-secondary" onClick={() => window.location.href = '/'} />
      </div>
    </div>
  );
}

export default ProductsSection;
