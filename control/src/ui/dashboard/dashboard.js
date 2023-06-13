import React from 'react';
import { firebaseAuth } from '../../util/firebase/firebase-util';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js';
import { Link } from "react-router-dom";
import Navbar from '../../components/navbar';

function Dashboard() {
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
    <div>
      <Navbar />

      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-sm-8">
            <div class="d-flex flex-column mt-4 alert alert-light" role="alert">
              <div className='fs-3'>Control | Tu Casa Construcciones</div>
              Te damos la bienvenida al sistema de gestion. A continuacion encontrar las opciones disponibles para ti.
            </div>

            <div className='d-flex flex-column p-3 border border-secondary rounded-3'>
              <div className='p-2'>
                <div className='fs-5'>Proyectos</div>
              </div>
              <hr></hr>

              <Link to="/purchase-order" className="text-decoration-none text-reset">
                <div className='container-fluid p-3 d-flex flex-row align-items-center shadow-sm bg-body-tertiary'>
                  <div className='container-fluid p-0 d-flex flex-column'>
                    <div className='fw-bold'>Orden de Compra</div>
                    <div className='fw-light'>Nueva orden de compra</div>
                  </div>
                  <i class="fs-3 bi bi-arrow-right"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
