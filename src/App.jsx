import { useState, useEffect } from 'react';
import './App.css';

import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';

import axios from 'axios';

import ProductsSection from './components/Products/ProductsSection';
import UsersSection from './components/Users/UsersSection';

function App() {
  const [activeTab, setActiveTab] = useState('productos');
  const [products, setProducts] = useState([]);

  // Cargar productos desde el backend
  useEffect(() => {
    axios.get('http://localhost:3000/productos')
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Inventario</h1>

      <div className="flex justify-center mb-4 space-x-4">
        <Button
          label="Productos"
          onClick={() => setActiveTab('productos')}
          className={activeTab === 'productos' ? 'p-button-primary' : 'p-button-outlined'}
        />
        <Button
          label="Usuarios"
          onClick={() => setActiveTab('usuarios')}
          className={activeTab === 'usuarios' ? 'p-button-primary' : 'p-button-outlined'}
        />
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        {activeTab === 'productos' && (
          <>

            <ProductsSection products={products} />
          </>
        )}
        {activeTab === 'usuarios' && (
          <UsersSection />
        )}
      </div>
    </div>
  );
}

export default App;

