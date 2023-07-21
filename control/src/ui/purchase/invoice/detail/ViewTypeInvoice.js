import React from 'react';

function ViewTypeInvoice({ data, positionSelected, setPositionSelected, isFormDisable }) {
  const options = data.map((item, index) => {
    return (<option value={index} key={index}>{item.name}</option>);
  });

  return (
    <div className="mb-3">
      <label htmlFor="labelTypeInvoice" className="form-label">Tipo de factura</label>
      <select className="form-select" aria-label="Default select example" id="inputTypeInvoice" value={positionSelected} onChange={(e) => setPositionSelected(e.target.value)} required disabled={isFormDisable}>
        {options}
      </select>
    </div>
  );;
};

export default ViewTypeInvoice;
