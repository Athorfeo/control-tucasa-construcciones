import React from 'react';
import { Link } from "react-router-dom";

function Navigator(props) {
  return (
    <div className='d-flex bg-body-tertiary p-3 mt-3 text-light text-decoration-none align-items-center'>
      <Link  className="text-light text-decoration-none" to={props.navigateTo}>
        <div className='d-flex flex-row align-items-center'>
          <button type="button" className="btn btn-outline-light me-3"><i className="bi bi-arrow-left"></i> Atras</button>
          
        </div>
      </Link>
      Proyecto: <div className='ms-1 fw-bold'>{props.projectName}</div>
    </div>
  );
}

export default Navigator;
