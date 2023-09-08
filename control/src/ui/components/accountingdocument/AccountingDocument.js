import React from 'react';
import { isSuperAdminRol, isAccountantRol } from "util/session-util";
import { staticData } from "data/static-data";

function AccountingDocument({ action, userRol, handleSubmit, value, onUpdateValue }) {
  var view = null;

  switch (action) {
    case staticData.uiActions.accountingSupport:
      if (isAccountantRol(userRol) || isSuperAdminRol(userRol)) {
        view = (
          <form onSubmit={handleSubmit}>
            <div className='container-fluid d-flex flex-column p-3 mb-2 mt-4 bg-body-tertiary'>
              <div className='container-fluid p-0 d-flex flex-column'>
                <div className="mb-3">
                  <label htmlFor="inputAccountingDocument" className="form-label">Documento Contable</label>
                  <input type="text" className="form-control" id="inputAccountingDocument" aria-describedby="accountingDocumentHelp" required value={value} onChange={(e) => onUpdateValue(e.target.value)}></input>
                </div>

              </div>

              <div className='d-flex flex-row justify-content-end border-top mt-3'>
                <button type="submit" className="btn btn-light mt-3">Añadir documento contable</button>
              </div>
            </div>
          </form>
        );
      }
      break;
  }

  return view;
};

export default AccountingDocument;
