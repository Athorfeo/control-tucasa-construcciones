import React, { forwardRef } from 'react';

function NoCancelableModal(props) {
  return (
    <div className="modal fade" id={props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={props.id + 'label'} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id={props.id + 'label'}>{props.data.title}</h1>
          </div>

          <div className="modal-body">
            <p>{props.data.message}</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={props.data.callbackButton}>
              {props.data.labelButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoCancelableModal;
