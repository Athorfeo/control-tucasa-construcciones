import React from 'react';

function ViewSuppliersSelect({ data, positionSelected, setPositionSelected, isFormDisable }) {
  const options = data.map((item, index) => {
    return (<option value={index} key={index}>{item[1] + ' ' + item[2] + ' - ' + item[4]}</option>);
  });

  return (
    <div className="mb-3">
      <label htmlFor="labelSupplier" className="form-label">Proveedor</label>
      <select className="form-select" aria-label="Default select example" id="inputSuplier" value={positionSelected} onChange={(e) => setPositionSelected(e.target.value)} required disabled={isFormDisable}>
        {options}
      </select>
    </div>
  );;
};

export default ViewSuppliersSelect;
