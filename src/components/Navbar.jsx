import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaMoon, FaSun, FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { useCart } from "./cartcontext";

function Navbar({ setFilter, setSearchTerm, theme, toggleTheme }) {
  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef(null);
  const { cart } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(searchText.toLowerCase());
    }, 300); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, setSearchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchText.toLowerCase());
    navigate('/'); 
    if (window.innerWidth < 992) {
      setMenuOpen(false);
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
    setSearchTerm("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleCategoryClick = (category) => {
    setFilter(category);
    setSearchText("");
    setSearchTerm("");
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} shadow-sm py-3 sticky-top`}>
      <div className="container">
        <Link 
          className="navbar-brand fw-bold fs-4" 
          to="/" 
          onClick={() => handleCategoryClick("all")}
        >
          HS-Shop
        </Link>

        <div className="d-flex align-items-center gap-3 d-lg-none">
          <button 
            className="btn btn-link p-0 text-decoration-none"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FaSun className="text-warning" /> : <FaMoon />}
          </button>
          
          <Link to="/cart" className="btn btn-link p-0 position-relative">
            <FaShoppingCart size={20} className={theme === 'dark' ? 'text-light' : 'text-dark'} />
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
          
          <button 
            className="navbar-toggler border-0 p-0" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <FaBars />
          </button>
        </div>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto mb-3 mb-lg-0">
            <li className="nav-item px-2">
              <button 
                className="nav-link btn btn-link" 
                onClick={() => handleCategoryClick("all")}
              >
                Tous les produits
              </button>
            </li>
            <li className="nav-item px-2">
              <button 
                className="nav-link btn btn-link" 
                onClick={() => handleCategoryClick("Man")}
              >
                Homme
              </button>
            </li>
            <li className="nav-item px-2">
              <button 
                className="nav-link btn btn-link" 
                onClick={() => handleCategoryClick("Women")}
              >
                Femme
              </button>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <form className="flex-grow-1" onSubmit={handleSearch}>
              <div className={`search-container position-relative ${searchFocused ? 'search-focused' : ''}`}>
                <div className={`input-group ${searchFocused ? 'border border-primary rounded overflow-hidden' : ''}`}>
                  <span className="input-group-text bg-transparent border-end-0">
                    <FaSearch className="text-muted" />
                  </span>
                  <input 
                    ref={searchInputRef}
                    className="form-control border-start-0 border-end-0 shadow-none"
                    type="search"
                    placeholder="Rechercher des produits..."
                    aria-label="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                  {searchText && (
                    <button 
                      type="button" 
                      className="btn bg-transparent border-start-0 border-end-0" 
                      onClick={handleClearSearch}
                      aria-label="Clear search"
                    >
                      <FaTimes className="text-muted" />
                    </button>
                  )}
                  <button className="btn btn-primary d-none d-md-block" type="submit">
                    Rechercher
                  </button>
                </div>
              </div>
            </form>

            <div className="d-none d-lg-flex align-items-center gap-3">
              <button 
                className="btn btn-link p-0 text-decoration-none"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FaSun className="text-warning" /> : <FaMoon />}
              </button>
              
              <Link to="/cart" className="btn btn-link p-0 position-relative">
                <FaShoppingCart size={20} className={theme === 'dark' ? 'text-light' : 'text-dark'} />
                {cart.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;