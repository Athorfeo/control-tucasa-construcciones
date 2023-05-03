import React from 'react';
import { Link } from "react-router-dom";

function Navigator(props) {
  return (
    <div className='d-flex bg-body-tertiary p-3 mt-3'>
      <Link to={props.navigateTo}>
        <button type="button" className="btn btn-outline-light me-3">Atras</button>
      </Link>
    </div>
  );
}

export default Navigator;
