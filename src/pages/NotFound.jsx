import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

function NotFound() {
  return (
    <div className="min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 text-center">
            <div className="card border-0 shadow-sm p-5">
              <h1 className="display-1 fw-bold text-primary mb-4">404</h1>
              <div className="mb-4">
                <FaSearch className="display-4 text-muted mb-4" />
                <h2 className="h4 fw-bold mb-3">Page introuvable</h2>
                <p className="text-muted mb-4">
                  Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
                </p>
              </div>
              <div className="d-grid gap-2">
                <Link to="/" className="btn btn-primary py-2">
                  <FaHome className="me-2" />
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;