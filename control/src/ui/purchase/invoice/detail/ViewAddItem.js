import React, { useState} from 'react';
import ViewChaptersSelect from "ui/components/chapters/ViewChaptersSelect";

function ViewAddItem({
  activityMaterialLabel,
  chapters,
  isSubmitDisabled,
  onAddItem,
}) {
  const [activityMaterial, setActivityMaterial] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [positionSelectedChapter, setPositionSelectedChapter] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();

    const selectedChapter = chapters[positionSelectedChapter];

    const data = {
      activityMaterial: activityMaterial,
      price: price,
      quantity: quantity,
      chapter: selectedChapter.name
    };

    onAddItem(data);

    setActivityMaterial("");
    setPrice("");
    setQuantity("");
    setPositionSelectedChapter(0);
  }

  return (
    <div className="modal fade" id="addItemModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addItemModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addItemModalLabel">Agregar {activityMaterialLabel}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="inputActivityMaterial" className="form-label">{activityMaterialLabel}</label>
                <input type="text" className="form-control" id="inputActivityMaterial" aria-describedby="activityMaterialHelp" required value={activityMaterial} onChange={(e) => setActivityMaterial(e.target.value)}></input>
              </div>

              <div className="mb-3">
                <label htmlFor="inputPrice" className="form-label">Precio</label>
                <input type="number" min="0" max="999999999" step="any" className="form-control" id="inputPrice" aria-describedby="priceHelp" required value={price} onChange={(e) => setPrice(e.target.value)} ></input>
                <div id="priceHelp" className="form-text">Los decimales deben ir con punto (26.39).</div>
              </div>

              <div className="mb-3">
                <label htmlFor="inputQuantity" className="form-label">Cantidad</label>
                <input type="number" min="0" max="9999" step="any" className="form-control" id="inputQuantity" aria-describedby="quantityHelp" required value={quantity} onChange={(e) => setQuantity(e.target.value)} ></input>
                <div id="quantityHelp" className="form-text">Los decimales deben ir con punto (26.39).</div>
              </div>

              <ViewChaptersSelect data={chapters} positionSelected={positionSelectedChapter} setPositionSelected={setPositionSelectedChapter} />

              <hr></hr>
              <div className='d-grid gap-2'>
                <button type="submit" className="btn btn-light" data-bs-dismiss="modal" disabled={isSubmitDisabled}>Agregar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAddItem;
