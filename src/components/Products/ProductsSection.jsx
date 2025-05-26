import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css'; 

function ProductsSection() {  
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '' });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {     
    fetchProductos();   
  }, []);

  const fetchProductos = async () => {  
    try {
      const res = await axios.get('/productos');
      const data = res.data.data;
      if (Array.isArray(data)) {
        setProductos(data);
      } else {
        console.error("Error: la respuesta no contiene un array válido");
        setProductos([]);
      }
    } catch (error) {
      console.error("Error al obtener productos: ", error);
      setProductos([]);
    }
  };

  
  /// Manejar cambios en el formulario
  const handleChange = (e) => {  
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  /// Enviar formulario
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
  /// Editar producto
  const handleEditar = (producto) => {
    setForm({ nombre: producto.nombre, precio: producto.precio });
    setEditandoId(producto.id);
  };

  /// Eliminar producto
  const handleEliminar = async (id) => {
    try {
      await axios.delete(`/productos/${id}`);
      fetchProductos();
    } catch (error) {
      console.error("Error al eliminar el producto: ", error);
    }
  };

  /// Exportar a PDF
  const exportarPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      startY: 20,
      head: [['ID','Nombre', 'Precio']],
      body: productos.map(p => [p.id, p.nombre, p.precio]),
    });
    doc.save('productos.pdf');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>

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
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <Button
          label={editandoId ? 'Actualizar' : 'Agregar'}
          icon="pi pi-shopping-cart"
          className="p-button-primary"
          type="submit"
        />
      </form>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Precio</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td className="border px-4 py-2">{p.nombre}</td>
              <td className="border px-4 py-2">${p.precio}</td>
              <td className="border px-4 py-2 space-x-2">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-warning"
                  onClick={() => handleEditar(p)}
                  aria-label="Editar"
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-danger"
                  onClick={() => handleEliminar(p.id)}
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

export default ProductsSection;
