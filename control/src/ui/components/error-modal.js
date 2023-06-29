import React from 'react';

function ErrorModal({id, error, callbackButton}) {
  return (
    <div className="modal fade" id={id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={id + 'label'} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id={id + 'label'}><i className="bi bi-exclamation-diamond"></i> Ha ocurrido un error</h1>
          </div>

          <div className="modal-body">
            <p>Hubo un error al procesar la peticion.</p>
            <p>Descripcion: {`${error}`}</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={callbackButton}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
