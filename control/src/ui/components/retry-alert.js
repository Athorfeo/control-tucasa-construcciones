import React from 'react';

function RetryAlert(props) {
  return (
    <div className="alert alert-warning" role="alert">
      <i className="bi bi-exclamation-triangle-fill"></i> {props.message}
      <hr></hr>
      <button type="button" className="btn btn-outline-warning" onClick={props.onClick}>Volver a intentar</button>
    </div>
  );
}

export default RetryAlert;
