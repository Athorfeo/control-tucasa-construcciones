import React from 'react';

export default function ErrorModal({data}) {
  return (
    <div className="modal fade" id="errorModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby='errorModallabel' aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id='errorModallabel'><i className="bi bi-exclamation-diamond"></i> Ha ocurrido un error</h1>
          </div>

          <div className="modal-body">
            <p>Hubo un error al procesar la peticion.</p>
            <p>{`${data.exception}`}</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={data.onDismissAction}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
