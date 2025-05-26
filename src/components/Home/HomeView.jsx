import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const HomeView = () => {
  const footer = (
    <div className="flex justify-center mt-4">
      <Link to="/usuarios" style={{ marginRight: '1rem' }}>
        <Button
          label="Ir a Usuarios"
          className="p-button-success"
          style={{
            fontSize: '1.1rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
          }}
        />
      </Link>
      <Link to="/productos">
        <Button
          label="Ir a Productos"
          className="p-button-success"
          style={{
            fontSize: '1.1rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
          }}
        />
      </Link>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      <Card
        title="¡Bienvenido!"
        subTitle="Gestión de Inventario de Productos y Usuarios"
        footer={footer}
        className="md:w-30rem shadow-2"
      >
        <p className="m-0 text-lg">
          Seleccione una opción para comenzar. Esta aplicación le permite administrar productos y usuarios de forma rápida y sencilla.
        </p>
      </Card>
    </div>
  );
};

export default HomeView;
