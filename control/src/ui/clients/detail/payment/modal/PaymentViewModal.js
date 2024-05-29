import React from 'react';
import CurrencyInput from "ui/components/input/CurrencyInput";
import TextInput from "ui/components/input/TextInput";
import FileInput from "ui/components/input/FileInput";
import DateInput from "ui/components/input/DateInput";
import { getPaymentType, getBanks } from "data/static-data";
import ViewPaymentTypeSelect from "ui/components/paymentType/ViewPaymentTypeSelect";
import ViewBanksSelect from "ui/components/banks/ViewBanksSelect";

function PaymentViewModal({ 
  formStatePayment,
  onUpdatePaymentDatePayment,
  onUpdateDocumentPayment,
  onUpdateAmountPayment,
  onSelectPaymentTypePayment,
  onSelectBankPayment,
  onUpdateObservationsPayment,
  onUpdatePaymentFile,
  isSubmitDisabledPayment,
  handleSubmitFormPayment
}) {
  return (
    <div className="modal fade" id="paymentViewModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="labelPaymentViewModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id="labelPaymentViewModal">Agregar Vivienda</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmitFormPayment}>
              
              <DateInput id="inputPaymentDate" label="Fecha" value={formStatePayment.paymentDate} onUpdateValue={onUpdatePaymentDatePayment}/>
              <TextInput id="inputDocument" label="Documento" value={formStatePayment.document} onUpdateValue={onUpdateDocumentPayment} isDisabled={true}/>
              <CurrencyInput id="inputAmount" label="Valor" value={formStatePayment.amount} onUpdateValue={onUpdateAmountPayment}/>
              <ViewPaymentTypeSelect data={getPaymentType} positionSelected={formStatePayment.positionSelectedPaymentType} setPositionSelected={onSelectPaymentTypePayment}/>
              <ViewBanksSelect data={getBanks} positionSelected={formStatePayment.positionSelectedBank} setPositionSelected={onSelectBankPayment} />
              <TextInput id="inputObservations" label="" value={formStatePayment.observations} onUpdateValue={onUpdateObservationsPayment}/>
              <FileInput id="inputPaymentFile" label="Factura de pago" fileUrl={formStatePayment.paymentFileUrl} onUpdateValue={onUpdatePaymentFile}/>

              <hr></hr>
              <div className='d-grid gap-2'>
                <button type="submit" className="btn btn-light" data-bs-dismiss="modal" disabled={isSubmitDisabledPayment()}>Agregar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PaymentViewModal;