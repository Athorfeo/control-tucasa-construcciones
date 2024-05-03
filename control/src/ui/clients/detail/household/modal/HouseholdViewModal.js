import React from 'react';
import { staticData } from "data/static-data";
import CurrencyInput from "ui/components/currency/CurrencyInput";
import { useHouseholdViewModalController } from "./useHouseholdViewModalController";

function HouseholdViewModal({ onAddItem }) {
  const {
    formState,
    onUpdateDocument,
    onUpdateNumberHousehold,
    onUpdateValue,
    onUpdateInitialFee,
    onUpdateBalance,
    isSubmitDisabled,
    handleSubmitForm
  } = useHouseholdViewModalController({
    onAddCallback: (data) => {
      onAddItem(data);
    }
  });

  return (
    <div className="modal fade" id="householdViewModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="labelHouseholdViewModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id="labelHouseholdViewModal">Agregar Vivienda</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmitForm}>
              <div className="mb-3">
                <label htmlFor="inputDocument" className="form-label">Documento</label>
                <input type="text" className="form-control" id="inputDocument" aria-describedby="inputDocumentHelp" value={formState.document} onChange={(e) => onUpdateDocument(e.target.value)}  disabled={true} required></input>
              </div>

              <div className="mb-3">
                <label htmlFor="inputNumberHousehold" className="form-label">Numero de vivienda</label>
                <input type="text" className="form-control" id="inputNumberHousehold" aria-describedby="inputNumberHouseholdHelp" value={formState.numberHousehold} onChange={(e) => onUpdateNumberHousehold(e.target.value)} required></input>
              </div>

              <CurrencyInput id="inputValue" label="Valor" value={formState.value} onUpdateValue={onUpdateValue}/>
              <CurrencyInput id="inputInitialValue" label="Cuota inicial" value={formState.initialFee} onUpdateValue={onUpdateInitialFee}/>
              <CurrencyInput id="inputBalance" label="Balance" value={formState.balance} onUpdateValue={onUpdateBalance}/>

              <hr></hr>
              <div className='d-grid gap-2'>
                <button type="submit" className="btn btn-light" data-bs-dismiss="modal" disabled={isSubmitDisabled()}>Agregar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HouseholdViewModal;