import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { FaFacebook, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';
import Home from "./pages/Home";
import Navbar from "../src/components/Navbar";
import Productdetail from './pages/Productdetails';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

import { CartProvider } from './components/cartcontext'; 

function App() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="d-flex flex-column min-vh-100">
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: theme === 'dark' ? '#333' : '#fff',
                color: theme === 'dark' ? '#fff' : '#333',
              },
            }}
          />
          
          <Navbar 
            setFilter={setFilter} 
            setSearchTerm={setSearchTerm} 
            theme={theme}
            toggleTheme={toggleTheme}
          />
          
          <main className="flex-grow-1 py-3">
            <Routes>
              <Route path="/" element={<Home filter={filter} searchTerm={searchTerm} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<Productdetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <footer className="bg-light py-5 mt-5">
            <div className="container">
              <div className="row g-4">
                <div className="col-lg-4 mb-4 mb-lg-0">
                  <h5 className="fw-bold mb-3">HS-Shop</h5>
                  <p className="text-muted mb-0">
                    Votre destination mode préférée pour des vêtements tendance et de qualité.
                  </p>
                </div>
                
                <div className="col-lg-4 mb-4 mb-lg-0">
                  <h5 className="fw-bold mb-3">Suivez-nous</h5>
                  <div className="d-flex gap-3">
                    <a href="#" className="text-muted text-decoration-none">
                      <FaFacebook size={24} />
                    </a>
                    <a href="#" className="text-muted text-decoration-none">
                      <FaTwitter size={24} />
                    </a>
                    <a href="#" className="text-muted text-decoration-none">
                      <FaInstagram size={24} />
                    </a>
                  </div>
                </div>
                
                <div className="col-lg-4">
                  <h5 className="fw-bold mb-3">Newsletter</h5>
                  <div className="input-group">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Votre email"
                      aria-label="Newsletter email"
                    />
                    <button className="btn btn-primary" type="button">
                      S'inscrire
                    </button>
                  </div>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div className="row align-items-center">
                <div className="col-md-6 text-center text-md-start">
                  <p className="text-muted mb-0">
                    © {new Date().getFullYear()} HS-Shop. Tous droits réservés.
                  </p>
                </div>
                <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
                  <p className="text-muted mb-0">
                    Fait avec <FaHeart className="text-danger mx-1" /> en Algérie
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
