import React from 'react';

function TextInput({ id, label, value, onUpdateValue, isDisabled = false, isRequired = true }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input type="text" className="form-control" id={id} aria-describedby={id + "Help"} required={isRequired} value={value} onChange={(e) => onUpdateValue(e.target.value)} disabled={isDisabled}></input>
    </div>
  );
};

export default TextInput;
