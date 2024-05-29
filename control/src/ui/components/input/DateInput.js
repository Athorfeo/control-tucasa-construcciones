import React from 'react';

function DateInput({ id, label, value, onUpdateValue, isDisabled = false }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input type="date" className="form-control" id={id} aria-describedby={id + "Help"} required value={value} onChange={(e) => onUpdateValue(e.target.value)} disabled={isDisabled}></input>
    </div>
  );
};

export default DateInput;

