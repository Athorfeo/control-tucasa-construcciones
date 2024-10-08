import React from 'react';

function ViewBanksSelect({ data, positionSelected, setPositionSelected, isFormDisable, isRequired = true }) {
  const options = data.map((item, index) => {
    return (<option value={index} key={index}>{item.name}</option>);
  });

  return (
    <div className="mb-3">
      <label htmlFor="labelChapters" className="form-label">Bancos</label>
      <select className="form-select" aria-label="Default select example" id="inputCahpters" value={positionSelected} onChange={(e) => setPositionSelected(e.target.value)} disabled={isFormDisable} required={isRequired}>
        {options}
      </select>
    </div>
  );;
};

export default ViewBanksSelect;
