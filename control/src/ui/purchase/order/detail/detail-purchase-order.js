import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar';
import Navigator from '../../../components/navigator';
import Loading from "../../../components/loading";
import AddProductDetailOrderPurchase from "./add-product-detail-order-purchase";
import { useParams } from 'react-router-dom';
import { fetchAllOrderPurchase } from "../../../../network/purchase-api";
import { fetchAllSuppliers } from "../../../../network/data-api";
import { storageConfig, getJsonItem } from "../../../../util/storage-util";

function DetailPurchaseOrder() {
  let { spreadsheetId, action, start, end } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  //Form Purchase Order
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [positionSelectedSupplier, setPositionSelectedSupplier] = useState('0');

  const removeProduct = (index) => {
    const position = products.indexOf(index);

    if (position > -1) {
      products.splice(position, 1);
    }

    setProducts(products);
  }

  const [titleAction, setTitleAction] = useState('');
  const productsView = products.map((item, index) =>
    <div className='container-fluid d-flex flex-column p-3 mb-2 bg-secondary-subtle' key={index + 1}>
      <div className='container-fluid p-0 d-flex flex-column'>
        <div className='d-flex flex-row d-flex justify-content-between'>
          <div className='fw-bold'>Nombre del producto</div>
          <div className='fw-bold'>#{index + 1}</div>
        </div>
        <div className='fw-light'>{item.productName}</div>


        <div className='fw-bold mt-2'>Cantidad</div>
        <div className='fw-light'>{item.productQuantity}</div>

        <div className='fw-bold mt-2'>Capitulo</div>
        <div className='fw-light'>{item.chapterName}</div>
      </div>

      <div className='d-flex flex-row justify-content-end border-top mt-3'>
        <button type="button" className="btn btn-outline-light mt-3" onClick={(e) => removeProduct(index)}><i className="bi bi-x-lg"></i> Eliminar</button>
      </div>
    </div>
  );
  function suppliersView() {
    const optionsView = suppliers.map((item, index) => {
      return (<option value={index} key={index}>{item[1] + ' ' + item[2] + ' - ' + item[4]}</option>);
    });

    return (
      <div className="mb-3">
        <label htmlFor="labelSupplier" className="form-label">Proveedor</label>
        <select className="form-select" aria-label="Default select example" id="inputSuplier" value={positionSelectedSupplier} onChange={(e) => setPositionSelectedSupplier(e.target.value)} required>
          {optionsView}
        </select>
      </div>
    );
  }

useEffect(() => {
  setIsLoading(true);
  switch (action) {
    case 'add':
      setTitleAction('Nueva');
      fetchSuppliers();
      break;
    case 'update':
      setTitleAction('Modificar');
      fetchOrderPurchase();
      break;
    case 'approve':
      setTitleAction('Aprobar');
      fetchOrderPurchase();
      break;
    default:
  }
}, []);

async function fetchOrderPurchase() {
  try {
    await fetchAllOrderPurchase(spreadsheetId)
      .then((response) => {
        console.log(response);
        handleOrderPurchaseResponse(response);
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

function handleOrderPurchaseResponse(response) {
  setIsLoading(false);
}

async function fetchSuppliers() {
  try {
    await fetchAllSuppliers(spreadsheetId)
      .then((response) => {
        console.log(response);
        handleSuppliersResponse(response);
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

function handleSuppliersResponse(response) {
  setSuppliers(response.data.suppliers);
  setIsLoading(false);
}

const handleSubmitOrderPurchase = (e) => {
  e.preventDefault();

  const selectedSupplier = suppliers[positionSelectedSupplier];

  const data = {
    observations: description,
    supplierName: (selectedSupplier[1] + ' ' + selectedSupplier[2]),
    products: products
  };

  console.log(JSON.stringify(data));

  switch (action) {
    case 'add':
      break;
    case 'update':
      break;
    case 'approve':
      break;
    default:
  }
};
return (
  <div>
    <Navbar />
    <AddProductDetailOrderPurchase />

    {isLoading ? (
      <Loading />
    ) : (
      <div className='container d-flex flex-column'>
        <Navigator navigateTo={'/purchase/order/' + spreadsheetId} />

        <div className='d-flex flex-row border-bottom fs-4 mb-2 mt-4'>
          <div className='p-3 mb-2 border-end'>{titleAction}</div>
          <div className='p-3'>Orden de compra</div>
        </div>

        <p>Modulo dedicado a la creacion, modificacion o aprobacion de Ordenes de Compra. Cada orden de compra esta compuesta por: Observaciones, Proveedor y los Productos a comprar.</p>
        <p>Verifica que todos los campos esten correctos antes de enviar la Orden. Recuerda que la Orden de compra se puede modificar hasta que se apruebe.</p>

        <form onSubmit={handleSubmitOrderPurchase}>
          <div className='container-fluid d-flex flex-column p-3 mb-2 bg-body-tertiary'>
            <div className='container-fluid p-0 d-flex flex-column'>
              <div className="mb-3">
                <label htmlFor="labelDescription" className="form-label">Observaciones</label>
                <textarea className="form-control" id="inputDescription" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
              </div>

              {suppliersView()}
            </div>

            <p className='mt-2 mb-2'>Productos</p>

            <button type="button" className="btn btn-outline-light mb-4 mt-2" data-bs-toggle="modal" data-bs-target="#addProductModal">Agregar Producto</button>

            {productsView.length > 0 ? (
              productsView
            ) : (
              <div>No hay productos añadidos</div>
            )}

            <div className='d-flex flex-row justify-content-end border-top mt-3'>
              <button type="submit" className="btn btn-light mt-3">Enviar factura</button>
            </div>
          </div>

        </form>
      </div>
    )}
  </div>
);
}

export default DetailPurchaseOrder;
