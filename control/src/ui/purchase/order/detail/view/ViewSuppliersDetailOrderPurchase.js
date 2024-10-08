import React from 'react';

function ViewSuppliersDetailOrderPurchase({ suppliers, positionSelectedSupplier, setPositionSelectedSupplier, isFormDisable }) {
  const options = suppliers.map((item, index) => {
    return (<option value={index} key={index}>{item.firstName + ' ' + item.lastName + ' - ' + item.document}</option>);
  });

  return (
    <div className="mb-3">
      <label htmlFor="labelSupplier" className="form-label">Proveedor</label>
      <select className="form-select" aria-label="Default select example" id="inputSuplier" value={positionSelectedSupplier} onChange={(e) => setPositionSelectedSupplier(e.target.value)} required disabled={isFormDisable}>
        {options}
      </select>
    </div>
  );;
};

export default ViewSuppliersDetailOrderPurchase
