import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar';
import Navigator from '../../../components/navigator';
import Loading from "../../../components/loading";
import { useParams } from 'react-router-dom';
import { fetchAllOrderPurchase } from "../../../../network/purchase-api";
import { storageConfig, getJsonItem } from "../../../../util/storage-util";
import { staticData } from "../../../../data/static-data";

function AddProductDetailOrderPurchase(props) {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [positionSelectedChapter, setPositionSelectedChapter] = useState(0);

  function chapterSelectView() {
    const optionsView = staticData.chapters.map((item, index) => {
      return (<option value={index} key={index}>{item.name}</option>);
    });

    return (
      <div className="mb-4">
        <label htmlFor="labelChapter" className="form-label">Capitulo</label>
        <select className="form-select" aria-label="Default select example" id="inputChapter" value={positionSelectedChapter} onChange={(e) => setPositionSelectedChapter(e.target.value)} required>
          {optionsView}
        </select>
      </div>
    );
  }

  const handleSubmitAddProduct = (e) => {
    e.preventDefault();

    const selectedChapter = staticData.chapters[positionSelectedChapter];

    const product = {
      productName: productName,
      productQuantity: quantity,
      chapterName: selectedChapter.name
    }

    props.callback(product);

    setProductName('');
    setQuantity('');
    setPositionSelectedChapter('');
  };

  useEffect(() => {

  }, []);

  const isSubmitButtonEnable = () => {
    if (
      productName !== '' && 
      quantity !== '' &&
      quantity.length <= 4 &&
      positionSelectedChapter !== '') {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="modal fade" id="addProductModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addProductModalLabel">Agregar producto</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmitAddProduct}>
              <div className="mb-3">
                <label htmlFor="inputProductName" className="form-label">Nombre del producto</label>
                <input type="text" className="form-control" id="inputProductName" aria-describedby="productNameHelp" value={productName} onChange={(e) => setProductName(e.target.value)} required></input>
                <div id="productNameHelp" className="form-text">Coloca el nombre del producto a agregar.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="inputProductQuantity" className="form-label">Cantidad</label>
                <input type="number" min="1" max="9999" className="form-control" id="inputProductQuantity" aria-describedby="productQuantityHelp" value={quantity} onChange={(e) => setQuantity(e.target.value)} required></input>
                <div id="productQuantityHelp" className="form-text">Coloca la cantidad del producto a agregar.</div>
              </div>

              {chapterSelectView()}

              <hr></hr>
              {isSubmitButtonEnable() ? (
                <div className='d-grid gap-2'>
                  <button type="submit" className="btn btn-light" data-bs-dismiss="modal" >Agregar</button>
                </div>
              ) : (
                <div className='d-grid gap-2 text-center'>
                  <button type="submit" className="btn btn-light" data-bs-dismiss="modal" disabled>Agregar</button>
                  Completa todos los campos del formulario
                </div>
              )}
            </form>
          </div>


        </div>
      </div>
    </div>
  );
}

export default AddProductDetailOrderPurchase;
