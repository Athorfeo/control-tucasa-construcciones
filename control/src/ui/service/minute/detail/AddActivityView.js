import React from 'react';
import { staticData } from "data/static-data";
import { useAddActivity } from "./useAddActivity";

export default function AddActivityView({ onAdd }) {
  const {
    activityName, setActivityName,
    positionSelectedUnit, setPositionSelectedUnit,
    positionSelectedChapter, setPositionSelectedChapter,
    isSubmitDisabled,
    handleSubmitForm
  } = useAddActivity({
    onAddCallback: (data) => {
      onAdd(data);
    }
  });

  const optionsUnits = staticData.units.map((item, index) => {
    return (<option value={index} key={index}>{item.name} - {item.detail}</option>);
  });

  const optionsChapters = staticData.chapters.map((item, index) => {
    return (<option value={index} key={index}>{item.name}</option>);
  });

  const selectUnit = (
    <div className="mb-4">
      <label htmlFor="labelUnit" className="form-label">Unidad</label>
      <select className="form-select" aria-label="Default select example" id="inputUnit" value={positionSelectedUnit} onChange={(e) => setPositionSelectedUnit(e.target.value)} required>
        {optionsUnits}
      </select>
    </div>
  );

  const selectChapters = (
    <div className="mb-4">
      <label htmlFor="labelChapter" className="form-label">Capitulo</label>
      <select className="form-select" aria-label="Default select example" id="inputChapter" value={positionSelectedChapter} onChange={(e) => setPositionSelectedChapter(e.target.value)} required>
        {optionsChapters}
      </select>
    </div>
  );

  return (
    <div className="modal fade" id="addProductModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addProductModalLabel">Agregar Actividad</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmitForm}>
              <div className="mb-3">
                <label htmlFor="inputProductName" className="form-label">Nombre de la Actividad</label>
                <input type="text" className="form-control" id="inputProductName" aria-describedby="productNameHelp" value={activityName} onChange={(e) => setActivityName(e.target.value)} required></input>
                <div id="productNameHelp" className="form-text">Coloca el nombre del producto a agregar.</div>
              </div>

              {selectUnit}

              {selectChapters}

              <hr></hr>
              <div className='d-grid gap-2'>
                <button type="submit" className="btn btn-light" data-bs-dismiss="modal" disabled={isSubmitDisabled()}>Agregar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
