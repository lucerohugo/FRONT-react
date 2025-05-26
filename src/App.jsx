import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import ProductsSection from './components/Products/ProductsSection';
import UsersSection from './components/Users/UsersSection';
import HomeView from './components/Home/HomeView';

function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/productos" element={<ProductsSection />} />
          <Route path="/usuarios" element={<UsersSection />} />
        </Routes>
      
    </Router>
  );
}

export default App;
