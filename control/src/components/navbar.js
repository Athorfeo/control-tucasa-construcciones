import React from 'react';
import { firebaseAuth } from '../util/firebase/firebase-util';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';
import { Link } from "react-router-dom";
import logo from '../src/drawables/logo.svg';

function Navbar() {
  function logout() {
    signOut(firebaseAuth).then(() => {
      console.log("SignOut success!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("SignOut failed!: [" + errorCode + "]:" + errorMessage);
    });
  }

  return (
    <div className='container-fluid'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">

            <a className="navbar-brand" href="#">
              <img src={logo} width="200" height="80" className="d-inline-block align-top" alt="logo" />
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <Link to="/dashboard" className='text-decoration-none text-reset'>
                    <a className="nav-link active" aria-current="page">Inicio</a>
                  </Link>
                </li>
              </ul>

              <div className="d-flex">
                <button className="btn btn-primary" onClick={logout}>Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </nav>
      </div>
  );
}

export default Navbar;
