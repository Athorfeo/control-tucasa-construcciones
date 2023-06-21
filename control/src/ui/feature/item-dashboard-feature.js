import React from 'react';
import { useNavigate } from "react-router-dom";

function ItemDashboardFeature(props) {
  const navigate = useNavigate();

  return (
    <div
      className='text-decoration-none text-reset container-fluid p-3 d-flex flex-row align-items-center bg-body-tertiary mb-2'
      onClick={() => { navigate(props.route); }}>
      <div className='container-fluid p-0 d-flex flex-column'>
        <div className='fw-bold'>{props.title}</div>
        <div className='fw-light'>{props.description}</div>
      </div>
      <i className="fs-3 bi bi-arrow-right"></i>
    </div>
  );
}

export default ItemDashboardFeature;
