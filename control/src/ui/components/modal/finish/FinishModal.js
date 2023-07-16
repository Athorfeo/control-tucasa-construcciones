import React from 'react';


function FinishModal({data}) {
  return (
    <div className="modal fade" id="noCancelableModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby='noCancelableModallabel' aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id='noCancelableModallabel'>{data.title}</h1>
          </div>

          <div className="modal-body">
            <p>{data.message}</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={data.onDismissAction}>
              {data.labelButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishModal;
