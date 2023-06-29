import React from 'react';

export default function ViewSuppliersDetailOrderPurchase({ suppliers, positionSelectedSupplier, setPositionSelectedSupplier }) {
  const options = suppliers.map((item, index) => {
    return (<option value={index} key={index}>{item[1] + ' ' + item[2] + ' - ' + item[4]}</option>);
  });

  return (
    <div className="mb-3">
      <label htmlFor="labelSupplier" className="form-label">Proveedor</label>
      <select className="form-select" aria-label="Default select example" id="inputSuplier" value={positionSelectedSupplier} onChange={(e) => setPositionSelectedSupplier(e.target.value)} required>
        {options}
      </select>
    </div>
  );;
};