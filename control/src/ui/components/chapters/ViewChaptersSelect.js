import React from 'react';

function ViewChaptersSelect({ data, positionSelected, setPositionSelected, isFormDisable }) {
  const options = data.map((item, index) => {
    return (<option value={index} key={index}>{item.name}</option>);
  });

  return (
    <div className="mb-3">
      <label htmlFor="labelChapters" className="form-label">Capitulo</label>
      <select className="form-select" aria-label="Default select example" id="inputCahpters" required value={positionSelected} onChange={(e) => setPositionSelected(e.target.value)} disabled={isFormDisable}>
        {options}
      </select>
    </div>
  );;
};

export default ViewChaptersSelect;
