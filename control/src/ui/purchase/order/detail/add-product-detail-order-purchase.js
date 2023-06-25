import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar';
import Navigator from '../../../components/navigator';
import Loading from "../../../components/loading";
import { useParams } from 'react-router-dom';
import { fetchAllOrderPurchase } from "../../../../network/purchase-api"
import { storageConfig, getJsonItem } from "../../../../util/storage-util"

function AddProductDetailOrderPurchase(props) {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [chapter, setChapter] = useState('');

  const handleSubmitAddProduct = (e) => {
    e.preventDefault();

    const row = {
      productName: productName,
      productQuantity: quantity,
      chapterName: chapter
    }

    props.callback(row);

    setProductName('');
    setQuantity('');
    setChapter('');
  };

  useEffect(() => {

  }, []);

  const isSubmitButtonEnable = () => {
    if (productName !== '' && quantity !== '' && chapter !== '') {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="modal fade" id="addProductModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addProductModalLabel">Modal title</h1>
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

              <div className="mb-3">
                <label htmlFor="labelChapter" className="form-label">Capitulo</label>
                <select className="form-select" aria-label="Default select example" id="inputChapter" value={chapter} onChange={(e) => setChapter(e.target.value)} required>
                  <option>Abrir para seleccionar el capitulo</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            {isSubmitButtonEnable() ? (
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" >Understood</button>
            ) : (
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" disabled>Understood</button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddProductDetailOrderPurchase;
