import React from 'react';
import CurrencyInput from "ui/components/input/CurrencyInput";
import TextInput from "ui/components/input/TextInput";
import FileInput from "ui/components/input/FileInput";

function HouseholdViewModal({ 
  formStateHousehold,
  onUpdateDocumentHousehold,
  onUpdateNumberHousehold,
  onUpdateValueHousehold,
  onUpdateInitialFeeHousehold,
  onUpdateBalanceHousehold,
  onUpdatePromiseFile,
  onUpdateInvoiceFile,
  onUpdateCertificateFile,
  isSubmitDisabledHousehold,
  handleSubmitFormHousehold
}) {
  return (
    <div className="modal fade" id="householdViewModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="labelHouseholdViewModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id="labelHouseholdViewModal">Agregar Vivienda</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmitFormHousehold}>
              
              <TextInput id="inputDocument" label="Documento" value={formStateHousehold.document} onUpdateValue={onUpdateDocumentHousehold} isDisabled={true}/>
              <TextInput id="inputNumberHousehold" label="Numero de vivienda" value={formStateHousehold.numberHousehold} onUpdateValue={onUpdateNumberHousehold}/>
              <CurrencyInput id="inputValue" label="Valor" value={formStateHousehold.value} onUpdateValue={onUpdateValueHousehold}/>
              <CurrencyInput id="inputInitialValue" label="Cuota inicial" value={formStateHousehold.initialFee} onUpdateValue={onUpdateInitialFeeHousehold}/>
              <CurrencyInput id="inputBalance" label="Balance" value={formStateHousehold.balance} onUpdateValue={onUpdateBalanceHousehold}/>
              <FileInput id="inputPromise" label="Promesa de compraventa" fileUrl={formStateHousehold.promiseFileUrl} onUpdateValue={onUpdatePromiseFile}/>
              <FileInput id="inputInvoice" label="Factura de venta" fileUrl={formStateHousehold.invoiceFileUrl} onUpdateValue={onUpdateInvoiceFile}/>
              <FileInput id="inputCertificate" label="Certificado" fileUrl={formStateHousehold.certificateFileUrl} onUpdateValue={onUpdateCertificateFile}/>

              <hr></hr>
              <div className='d-grid gap-2'>
                <button type="submit" className="btn btn-light" data-bs-dismiss="modal" disabled={isSubmitDisabledHousehold()}>Agregar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HouseholdViewModal;