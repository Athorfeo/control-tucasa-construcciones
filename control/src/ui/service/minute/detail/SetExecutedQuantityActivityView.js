import React, { useState } from 'react';

export default function SetExecutedQuantityActivityView({ onSetExecutedQuantity  }) {
  const [executedQuantity, setExecutedQuantity] = useState('');

  const isSubmitDisabled = () => {
    if (executedQuantity !== '') {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    onSetExecutedQuantity(executedQuantity);
    setExecutedQuantity('');
  };

  return (
    <div className="modal fade" id="setExecutedQuantityModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="setExecutedQuantityModalabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addProductModalLabel">Establecer Cantidad Ejecutada</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmitForm}>
              <div className="mb-3">
                <label htmlFor="inputExecutedQuantity" className="form-label">Cantidad Ejecutada</label>
                <input type="text" className="form-control" id="inputExecutedQuantity" aria-describedby="executedQuantityHelp" value={executedQuantity} onChange={(e) => setExecutedQuantity(e.target.value)} required></input>
                <div id="executedQuantityHelp" className="form-text">Establece la cantidad ejectutada.</div>
              </div>

              <hr></hr>
              <div className='d-grid gap-2'>
                <button type="submit" className="btn btn-light" data-bs-dismiss="modal" disabled={isSubmitDisabled()}>Establecer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
