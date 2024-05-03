import React from 'react';

function FileInput({ id, label, fileUrl, onUpdateValue, isDisabled = false }) {
  return (
    <div className="mb-3">
    <label htmlFor={id} className="form-label">{label}</label>
    <input type="file" className="form-control" id="inputDocumentFile" accept=".pdf,image/*" onChange={(e) => {onUpdateValue(e.target)}} disabled={isDisabled}></input>
    {fileUrl != "" ? (<a href={fileUrl} target="_blank" type="button" className="btn btn-outline-light mt-2" >Ver archivo</a>) : (null)}
    </div>
  );
};

export default FileInput;
