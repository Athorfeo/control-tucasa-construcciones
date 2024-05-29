import React from 'react';
import { currencyPattern, setCurrencyFormat, removeCurrencyFormat } from "util/currencyUtil";

function CurrencyInput({ id, label, value, onUpdateValue, isDisabled = false }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <div className="input-group">
        <span className="input-group-text" id="inputGroupPrepend">$</span>
        <input type="text" pattern={currencyPattern} inputMode="numeric" className="form-control" id={id} aria-describedby={id + "Help"} required value={setCurrencyFormat(value)} onChange={(e) => onUpdateValue(removeCurrencyFormat(e.target.value))} disabled={isDisabled}></input>
      </div>
      <div id={id + "Help"} className="form-text">Los decimales deben ir con punto (26.39).</div>
    </div>
  );
};

export default CurrencyInput;
