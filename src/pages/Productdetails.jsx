import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import { FaStar, FaEye, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import products from "../data/data";
import { useCart } from "../components/cartcontext";

export const Productdetails = () => {
  const { addtoCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const handleAddToCart = () => {
    addtoCart(product, quantity);
  };
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  useEffect(() => {
    setLoading(true);
    const storedproduct = localStorage.getItem(`product-${id}`);
    let found;
    
    if (storedproduct) {
      found = JSON.parse(storedproduct);
      found.views += 0.5;
    } else {
      const original = products.find((p) => p.id === parseInt(id));
      if (original) {
        found = { ...original, views: original.views + 0.5 };
      }
    }

    if(found) {
      setTimeout(() => {
        setProduct(found);
        
        const related = products
          .filter(p => p.category === found.category && p.id !== found.id)
          .slice(0, 4);
        setRelatedProducts(related);
        
        localStorage.setItem(`product-${id}`, JSON.stringify(found));
        setLoading(false);
      }, 800);
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-grow text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 min-vh-100">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="text-center py-5 bg-light rounded-3 shadow-sm">
              <div className="mb-4">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="h4 mb-3">Produit non trouvé</h3>
              <p className="text-muted mb-4 px-4">
                Nous n'avons pas pu trouver le produit que vous recherchez. Il a peut-être été supprimé ou déplacé.
              </p>
              <Link
                to="/"
                className="btn btn-primary px-4 py-2 rounded-pill"
              >
                <FaArrowLeft className="me-2" />
                Retour à la boutique
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const productImages = [
    product.image,
    product.image,
    product.image
  ];

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              <i className="bi bi-house-door me-1"></i>Accueil
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">{product.category}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
        </ol>
      </nav>

      <div className="row g-5">
        <div className="col-lg-6">
          <div className="product-gallery mb-4">
            <div className="position-relative overflow-hidden rounded-3 shadow-sm mb-3">
              <img
                src={productImages[activeImage]}
                alt={product.title}
                className="img-fluid w-100"
                style={{ objectFit: "cover", height: "500px" }}
              />
              
              {product.views < 10 && (
                <div className="position-absolute top-0 end-0 m-3">
                  <span className="badge bg-danger py-2 px-3 rounded-pill">
                    Nouveau!
                  </span>
                </div>
              )}
              
              {product.sold > 30 && (
                <div className="position-absolute top-0 start-0 m-3">
                  <span className="badge bg-warning text-dark py-2 px-3 rounded-pill">
                    Populaire
                  </span>
                </div>
              )}
            </div>
            
            <div className="row g-2">
              {productImages.map((img, index) => (
                <div className="col-4" key={index}>
                  <div 
                    className={`cursor-pointer rounded-3 overflow-hidden ${activeImage === index ? 'border border-3 border-primary' : 'border'}`}
                    onClick={() => setActiveImage(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src={img} 
                      alt={`${product.title} - vue ${index + 1}`} 
                      className="img-fluid"
                      style={{ height: "80px", width: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="product-details">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="badge bg-secondary">{product.category}</span>
              <div className="d-flex align-items-center ms-auto">
                <div className="d-flex align-items-center text-muted me-3">
                  <FaEye className="me-1" />
                  <small>{Math.floor(product.views)} vues</small>
                </div>
                <div className="d-flex align-items-center text-muted">
                  <FaShoppingCart className="me-1" />
                  <small>{product.sold} vendus</small>
                </div>
              </div>
            </div>
            
            <h1 className="h2 fw-bold mb-3">{product.title}</h1>
            
            {product.reviews && product.reviews.length > 0 && (
              <div className="d-flex align-items-center mb-3">
                <div className="text-warning me-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={16}
                      className={i < Math.floor(product.reviews[0].rating) ? "text-warning" : "text-muted opacity-25"}
                    />
                  ))}
                </div>
                <span className="ms-2 text-muted">
                  {product.reviews[0].rating} ({product.reviews.length} avis)
                </span>
              </div>
            )}
            
            <div className="mb-4 pb-3 border-bottom">
              <h2 className="h2 fw-bold text-primary mb-0">
                {product.price.toLocaleString()} DA
              </h2>
              <p className="text-success mt-1 mb-0">
                <i className="bi bi-check-circle me-1"></i>
                En stock et prêt à être expédié
              </p>
            </div>
            
            <div className="mb-4">
              <p className="text-muted mb-3">
                Un produit de qualité supérieure, sélectionné avec soin pour notre collection. 
                Livraison disponible partout en Algérie.
              </p>
              
              <div className="d-flex align-items-center gap-3 bg-light p-3 rounded-3 mb-4">
                <i className="bi bi-truck text-primary fs-5"></i>
                <div>
                  <p className="fw-medium mb-0">Livraison rapide</p>
                  <p className="text-muted small mb-0">2-4 jours ouvrables</p>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="form-label fw-medium mb-2">Quantité</label>
              <div className="d-flex align-items-center">
                <button 
                  className="btn btn-outline-secondary px-3" 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <i className="bi bi-dash"></i>
                </button>
                <input 
                  type="number" 
                  className="form-control text-center mx-2" 
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  style={{ maxWidth: "80px" }}
                />
                <button 
                  className="btn btn-outline-secondary px-3" 
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>
            
            <div className="d-grid gap-2 mb-4">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-lg py-3 rounded-pill"
                type="button"
                disabled={product.sold === 0}
              >
                <i className="bi bi-bag-plus me-2"></i>
                {product.sold === 0 ? "Produit épuisé" : "Ajouter au panier"}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3 border-bottom">
              <h3 className="h5 mb-0">Avis clients</h3>
            </div>
            <div className="card-body p-4">
              {product.reviews.length === 0 ? (
                <div className="text-center py-4">
                  <div className="mb-3">
                    <i className="bi bi-chat-square-text text-muted" style={{ fontSize: "3rem" }}></i>
                  </div>
                  <p className="text-muted mb-0">Aucun avis pour le moment</p>
                </div>
              ) : (
                <div className="reviews">
                  {product.reviews.map((review, index) => (
                    <div key={index} className={`review ${index > 0 ? 'border-top pt-4 mt-4' : ''}`}>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                               style={{ width: "48px", height: "48px" }}>
                            <span className="fw-bold">{review.user.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="h6 fw-bold mb-0">{review.user}</h4>
                            <p className="text-muted small mb-0">Client vérifié</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="text-warning me-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                size={14}
                                className={i < Math.floor(review.rating) ? "text-warning" : "text-muted opacity-25"}
                              />
                            ))}
                          </div>
                          <span className="badge bg-light text-dark">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <p className="mb-0">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products mt-5 pt-3">
          <h3 className="h4 mb-4">Produits similaires</h3>
          <div className="row g-4">
            {relatedProducts.map((item) => (
              <div key={item.id} className="col-6 col-md-3">
                <div className="card h-100 border-0 shadow-sm product-card overflow-hidden">
                  <div className="position-relative" style={{ height: "200px" }}>
                    <Link to={`/product/${item.id}`} className="text-decoration-none">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="card-img-top h-100 w-100" 
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </div>
                  <div className="card-body p-3">
                    <Link 
                      to={`/product/${item.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <h5 className="card-title small fw-bold text-truncate mb-1">
                        {item.title}
                      </h5>
                    </Link>
                    <p className="fw-bold text-primary mb-0">
                      {item.price.toLocaleString()} DA
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Productdetails;