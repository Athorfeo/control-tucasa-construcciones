import React from 'react';

function DocumentTypeSelectView({ data, positionSelected, setPositionSelected, isFormDisable, isRequired }) {
  const options = data.map((item, index) => {
    return (<option value={index} key={index}>{item.name}</option>);
  });

  return (
    <div className="mb-3">
      <label htmlFor="labelDocumentType" className="form-label">Tipos de documento</label>
      <select className="form-select" aria-label="Default select example" id="inputDocumentType" value={positionSelected} onChange={(e) => setPositionSelected(e.target.value)} disabled={isFormDisable} required={isRequired}>
        {options}
      </select>
    </div>
  );;
};

export default DocumentTypeSelectView;
