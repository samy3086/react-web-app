import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products from "../data/data";
import { useCart } from "../components/cartcontext";

function ProductSkeleton() {
  return (
    <div className="col-sm-6 col-lg-4 col-xl-3 mb-4">
      <div className="card border-0 h-100 shadow-sm">
        <div className="placeholder-glow">
          <div className="placeholder w-100 rounded-top" style={{ height: "280px" }}></div>
        </div>
        <div className="card-body d-flex flex-column p-4">
          <div className="placeholder-glow">
            <span className="placeholder col-8 mb-2"></span>
            <span className="placeholder col-6 mb-3"></span>
          </div>
          <div className="d-flex justify-content-between mb-3 placeholder-glow">
            <span className="placeholder col-4"></span>
            <span className="placeholder col-3"></span>
          </div>
          <div className="mt-auto pt-3 placeholder-glow">
            <span className="placeholder col-12 rounded"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home({ filter, searchTerm }) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const { addtoCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProductList(products);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = productList.filter((item) => {
    const matchCategory = filter === "all" || item.category.toLowerCase() === filter.toLowerCase();
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addtoCart(product, 1);
  };

  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Découvrez notre collection</h1>
        <p className="text-muted lead mb-4 mx-auto" style={{ maxWidth: "700px" }}>
          Des produits sélectionnés avec soin pour vous offrir style et qualité au meilleur prix
        </p>
        {!loading && (
          <div className="d-inline-flex align-items-center bg-light rounded-pill px-3 py-2 mb-4">
            <span className="text-muted me-2">Produits disponibles:</span>
            <span className="fw-bold">{filteredProducts.length}</span>
          </div>
        )}
      </header>

      {loading ? (
        <div className="row">
          {[...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="text-center py-5 bg-light rounded-3 shadow-sm">
              <div className="mb-4">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3 className="h4 mb-3">Aucun produit trouvé</h3>
              <p className="text-muted mb-4 px-4">
                Nous n'avons trouvé aucun produit correspondant à votre recherche. Essayez avec d'autres termes ou catégories.
              </p>
              <button 
                className="btn btn-primary px-4 py-2 rounded-pill"
                onClick={() => {
                  window.scrollTo(0, 0);
                  window.location.href = '/';
                }}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Voir tous les produits
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {filteredProducts.map((item) => (
              <div key={item.id} className="col-sm-6 col-lg-4 col-xl-3 mb-4">
                <div 
                  className="card h-100 border-0 shadow-sm product-card overflow-hidden"
                  onMouseEnter={() => setHoveredProduct(item.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="position-relative overflow-hidden product-img-container" style={{ height: "280px" }}>
                    <Link to={`/product/${item.id}`} className="text-decoration-none">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="card-img-top h-100 w-100" 
                        style={{ 
                          objectFit: "cover", 
                          transition: "transform 0.5s ease",
                          transform: hoveredProduct === item.id ? "scale(1.05)" : "scale(1)"
                        }}
                      />
                      {item.views < 10 && (
                        <div className="position-absolute top-0 end-0 m-3">
                          <span className="badge bg-danger">Nouveau</span>
                        </div>
                      )}
                      {item.sold > 30 && (
                        <div className="position-absolute top-0 start-0 m-3">
                          <span className="badge bg-warning text-dark">Populaire</span>
                        </div>
                      )}
                      <div className={`quick-add-overlay position-absolute bottom-0 start-0 end-0 bg-white bg-opacity-90 py-3 px-3 d-flex justify-content-between align-items-center ${hoveredProduct === item.id ? 'show-quick-add' : 'hide-quick-add'}`}
                          style={{
                            transition: 'transform 0.3s ease',
                            transform: hoveredProduct === item.id ? 'translateY(0)' : 'translateY(100%)'
                          }}>
                        <span className="fw-bold">{item.price.toLocaleString()} DA</span>
                        <button 
                          className="btn btn-sm btn-primary rounded-pill px-3"
                          onClick={(e) => handleAddToCart(e, item)}
                        >
                          <i className="bi bi-bag-plus me-1"></i> Ajouter
                        </button>
                      </div>
                    </Link>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-light text-dark">{item.category}</span>
                      {item.reviews && item.reviews.length > 0 && (
                        <div className="d-flex align-items-center">
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          <small>{item.reviews[0].rating}</small>
                        </div>
                      )}
                    </div>
                    <Link 
                      to={`/product/${item.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <h5 className="card-title mb-3 fw-bold text-truncate">
                        {item.title}
                      </h5>
                    </Link>
                    <div className="d-grid">
                      <Link 
                        to={`/product/${item.id}`}
                        className="btn btn-outline-dark rounded-pill"
                      >
                        Voir détails
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-5 text-center">
            <div className="d-inline-flex align-items-center bg-light rounded-pill px-4 py-2">
              <i className="bi bi-info-circle me-2"></i>
              <span>Tous nos produits sont disponibles avec livraison rapide</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;