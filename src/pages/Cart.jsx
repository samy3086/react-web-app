import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/cartcontext';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaArrowLeft, FaShieldAlt, FaTruck, FaCreditCard } from 'react-icons/fa';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  
  if (cart.length === 0) {
    return (
      <div className="container py-5 min-vh-100">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-sm text-center p-5">
              <div className="py-4">
                <div className="mb-4">
                  <div className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center" style={{ width: "120px", height: "120px" }}>
                    <FaShoppingCart size={48} className="text-muted" />
                  </div>
                </div>
                <h2 className="h4 fw-bold mb-3">Votre panier est vide</h2>
                <p className="text-muted mb-4 px-md-5">
                  Il semble que vous n'ayez pas encore ajouté d'articles à votre panier.
                  Découvrez notre sélection de produits pour commencer votre shopping.
                </p>
                <Link to="/" className="btn btn-primary px-4 py-2 rounded-pill">
                  <FaArrowLeft className="me-2" />
                  Continuer mes achats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              <i className="bi bi-house-door me-1"></i>Accueil
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Mon panier</li>
        </ol>
      </nav>
      
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h3 fw-bold d-flex align-items-center">
            <i className="bi bi-cart-fill me-2 text-primary"></i>
            Mon Panier
            <span className="badge bg-primary ms-2 rounded-pill">{cart.length}</span>
          </h1>
        </div>
      </div>
      
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3 border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="h5 mb-0 fw-bold">Articles du panier</h2>
                <Link to="/" className="btn btn-outline-primary btn-sm rounded-pill">
                  <FaArrowLeft className="me-1" />
                  Continuer mes achats
                </Link>
              </div>
            </div>
            <div className="card-body p-0">
              {cart.map((item, index) => (
                <div key={item.id} className={`p-4 ${index !== 0 ? 'border-top' : ''}`}>
                  <div className="row align-items-center">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <Link to={`/product/${item.id}`} className="d-block overflow-hidden rounded-3 shadow-sm">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="img-fluid"
                          style={{ height: "120px", objectFit: "cover", width: "100%", transition: "transform 0.3s ease" }}
                          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        />
                      </Link>
                    </div>
                    <div className="col-md-9">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Link 
                          to={`/product/${item.id}`}
                          className="text-decoration-none text-dark"
                        >
                          <h3 className="h6 fw-bold mb-0">{item.title}</h3>
                        </Link>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-sm btn-outline-danger rounded-circle p-1"
                          aria-label="Supprimer l'article"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                      
                      <div className="d-flex align-items-center text-muted small mb-3">
                        <span className="badge bg-light text-secondary me-2">{item.category}</span>
                      </div>
                      
                      <div className="row align-items-center">
                        <div className="col-sm-5">
                          <div className="d-flex align-items-center">
                            <button 
                              className="btn btn-sm btn-outline-secondary rounded-circle" 
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity === 1}
                              style={{ width: "32px", height: "32px" }}
                            >
                              <FaMinus size={10} />
                            </button>
                            <span className="mx-3 fw-medium">
                              {item.quantity}
                            </span>
                            <button 
                              className="btn btn-sm btn-outline-secondary rounded-circle" 
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{ width: "32px", height: "32px" }}
                            >
                              <FaPlus size={10} />
                            </button>
                          </div>
                        </div>
                        <div className="col-sm-7 text-sm-end mt-3 mt-sm-0">
                          <div className="text-muted small mb-1">Prix unitaire: {item.price.toLocaleString()} DA</div>
                          <div className="fw-bold text-primary">Total: {(item.price * item.quantity).toLocaleString()} DA</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="row g-3">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center p-3">
                  <FaTruck className="text-primary me-3" size={24} />
                  <div>
                    <h4 className="h6 fw-bold mb-1">Livraison rapide</h4>
                    <p className="text-muted small mb-0">2-4 jours ouvrables à travers l'Algérie</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center p-3">
                  <FaShieldAlt className="text-primary me-3" size={24} />
                  <div>
                    <h4 className="h6 fw-bold mb-1">Achat sécurisé</h4>
                    <p className="text-muted small mb-0">30 jours pour échanger ou se faire rembourser</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4 position-sticky" style={{ top: "20px" }}>
            <div className="card-header bg-white py-3 border-bottom">
              <h4 className="h5 mb-0 fw-bold">Récapitulatif de commande</h4>
            </div>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Sous-total ({cart.reduce((acc, item) => acc + item.quantity, 0)} articles)</span>
                <span className="fw-bold">{getTotalPrice().toLocaleString()} DA</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Frais de livraison</span>
                <span className="text-success fw-medium">Gratuit</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Taxes</span>
                <span className="fw-medium">Incluses</span>
              </div>
              
              <hr className="my-4" />
              
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Total à payer</h5>
                <div className="text-end">
                  <span className="h4 text-primary fw-bold mb-0">{getTotalPrice().toLocaleString()} DA</span>
                </div>
              </div>
              
              <button className="btn btn-primary btn-lg w-100 py-3 rounded-pill fw-bold mb-3">
                <FaCreditCard className="me-2" />
                Procéder au paiement
              </button>
              
              <div className="mt-3">
                <div className="d-flex align-items-center mb-2 bg-light p-2 rounded-3">
                  <i className="bi bi-lock-fill text-primary me-2"></i>
                  <span className="small">Paiement 100% sécurisé</span>
                </div>
                <div className="d-flex align-items-center bg-light p-2 rounded-3">
                  <i className="bi bi-shield-check text-primary me-2"></i>
                  <span className="small">Vos données sont protégées</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;