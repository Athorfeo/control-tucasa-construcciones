import React from 'react';

function ItemDashboardFeatureHttp(props) {
  function render() {
    const view = (
      <a href={props.url} target="_blank" className='container-fluid d-flex flex-row align-items-center p-3 mb-2 text-decoration-none text-reset bg-body-tertiary' >
        <div className='flex-fill p-0 d-flex flex-column'>
          <div className='fw-bold'>{props.title}</div>
          <div className='fw-light'>{props.description}</div>
        </div>
        {props.isEnable ? (
          <i className="fs-3 bi bi-arrow-right"></i>
        ) : (
          <div className='d-flex flex-row text-info'>
            <i className="bi bi-exclamation-diamond-fill me-2"></i>
            No disponible
          </div>
        )}
      </a>
    );

    return view;
  }

  return (render());
}

export default ItemDashboardFeatureHttp;
