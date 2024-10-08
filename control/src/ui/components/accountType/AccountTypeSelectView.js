import React from 'react';

function AccountTypeSelectView({ data, positionSelected, setPositionSelected, isFormDisable, isRequired = true }) {
  const options = data.map((item, index) => {
    return (<option value={index} key={index}>{item.name}</option>);
  });

  return (
    <div className="mb-3">
      <label htmlFor="labelAccountType" className="form-label">Tipos de cuenta</label>
      <select className="form-select" aria-label="Default select example" id="inputAccountType" value={positionSelected} onChange={(e) => setPositionSelected(e.target.value)} disabled={isFormDisable} required={isRequired}>
        {options}
      </select>
    </div>
  );;
};

export default AccountTypeSelectView;
