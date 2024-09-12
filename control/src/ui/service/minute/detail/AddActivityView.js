import React from 'react';
import { staticData } from "data/static-data";
import { useAddActivity } from "./useAddActivity";

function AddActivityView({ onAdd }) {
  const {
    positionSelectedUnit, setPositionSelectedUnit,
    positionSelectedChapter, onUpdateChapter,
    positionSelectedActivityChapter, onUpdateActivityChapter,
    activitiesChapter,
    isSubmitDisabled,
    handleSubmitForm
  } = useAddActivity({
    onAddCallback: (data) => {
      onAdd(data);
    }
  });

  // Chapters
  const optionsChapters = staticData.chapters.map((item, index) => {
    return (<option value={index} key={index}>{item.name}</option>);
  });

  const selectChapters = (
    <div className="mb-4">
      <label htmlFor="labelChapter" className="form-label">Capitulo</label>
      <select className="form-select" aria-label="Default select example" id="inputChapter" value={positionSelectedChapter} onChange={(e) => onUpdateChapter(e.target.value)} required>
        {optionsChapters}
      </select>
    </div>
  );

  // Activity chapters
  const activityChapterOptions = activitiesChapter.map((item, index) => {
    return (<option value={index} key={index}>{item}</option>);
  });

  const activityChapterSelect = (
    <div className="mb-4">
      <label htmlFor="labelActivityChapter" className="form-label">Actividad</label>
      <select className="form-select" aria-label="Default select example" id="inputActivityChapter" value={positionSelectedActivityChapter} onChange={(e) => onUpdateActivityChapter(e.target.value)} required>
        {activityChapterOptions}
      </select>
    </div>
  );

  // Unit (Unidad)
  const optionsUnits = staticData.units.map((item, index) => {
    return (<option value={index} key={index}>{item.name} - {item.detail}</option>);
  });

  const selectUnit = (
    <div className="mb-4">
      <label htmlFor="labelUnit" className="form-label">Unidad</label>
      <select className="form-select" aria-label="Default select example" id="inputUnit" value={positionSelectedUnit} onChange={(e) => setPositionSelectedUnit(e.target.value)} required>
        {optionsUnits}
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
              {selectChapters}
              {activityChapterSelect}
              {selectUnit}
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


export default AddActivityView;