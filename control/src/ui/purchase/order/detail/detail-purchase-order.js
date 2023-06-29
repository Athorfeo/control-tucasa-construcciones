import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../../components/navbar';
import Navigator from '../../../components/navigator';
import Loading from "../../../components/loading";
import NoCancelableModal from "../../../components/no-cancelable-modal";
import ErrorModal from "../../../components/error-modal";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllOrderPurchase, fetchAppendOrderPurchase } from "../../../../network/purchase-api";
import { fetchAllSuppliers } from "../../../../network/data-api";
import { storageConfig, getJsonItem } from "../../../../util/storage-util";
import * as bootstrap from 'bootstrap';
import { useProductsOrderPurchase } from "./hook/useProductsOrderPurchase";
import { useSuppliersOrderPurchase } from "./hook/useSuppliersOrderPurchase";
import ViewProductsDetailOrderPurchase from "./view/ViewProductsDetailOrderPurchase";
import ViewAddProductDetailOrderPurchase from "./view/ViewAddProductDetailOrderPurchase";
import ViewSuppliersDetailOrderPurchase from "./view/ViewSuppliersDetailOrderPurchase";

function DetailPurchaseOrder() {
  let { spreadsheetId, action, start, end } = useParams();
  const navigate = useNavigate();

  const { products, setProducts, onRemoveProduct, onAddProduct } = useProductsOrderPurchase();
  const { suppliers, positionSelectedSupplier, setPositionSelectedSupplier, fetchSuppliers } = useSuppliersOrderPurchase(spreadsheetId);

  const [isLoading, setIsLoading] = useState(false);

  // Logic
  const [description, setDescription] = useState('');

  // UI
  const [titleAction, setTitleAction] = useState('');
  const [errorModalData, setErrorModalData] = useState({
    isShowing: false,
    action: "",
    error: "",
    callbackButton: null
  });
  const [finishDialogData, setFinishDialogData] = useState({
    isShowing: false,
    title: "",
    message: "",
    labelButton: "",
    callbackButton: null
  });

  // Services
  useEffect(() => {
    const task = async () => {
      setIsLoading(true);
      switch (action) {
        case 'add':
          setTitleAction('Nueva');
          await fetchSuppliers();
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
      setIsLoading(false);
    }

    task();
  }, []);

  // Fetch Order Purchase
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

  // Append Order Purchase
  async function appendOrderPurchase(orderPurchase) {
    setIsLoading(true);
    try {
      await fetchAppendOrderPurchase(spreadsheetId, orderPurchase)
        .then((_) => {
          handleAppendOrderPurchase();
        });
    } catch (error) {
      console.error("Error:", error);

      setErrorModalData({
        isShowing: true,
        action: "Append",
        error: error,
        callbackButton: null
      });

      const finishModal = new bootstrap.Modal('#errorModal');
      finishModal.show();

      setIsLoading(false);
    }
  }

  function handleAppendOrderPurchase() {
    setFinishDialogData({
      isShowing: true,
      title: "Agregado correctamente",
      message: "El orden de compra se ha agregado exitosamente. Pulse el boton para finalizar.",
      labelButton: "Finalizar",
      callbackButton: () => { navigate('/purchase/order/' + spreadsheetId); }
    });
    setIsLoading(false);
    const finishModal = new bootstrap.Modal('#noCancelableModal');
    finishModal.show();
  }

  // Form
  const handleSubmitOrderPurchase = (e) => {
    e.preventDefault();

    const selectedSupplier = suppliers[positionSelectedSupplier];

    const orderPurchase = {
      observations: description,
      supplierName: (selectedSupplier[1] + ' ' + selectedSupplier[2]),
      products: products
    };

    switch (action) {
      case 'add':
        appendOrderPurchase(orderPurchase);
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
      <ErrorModal id="errorModal" data={errorModalData} />
      <NoCancelableModal id="noCancelableModal" data={finishDialogData} />
      <ViewAddProductDetailOrderPurchase onAddProduct={onAddProduct} />

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

                <ViewSuppliersDetailOrderPurchase suppliers={suppliers} positionSelectedSupplier={positionSelectedSupplier} setPositionSelectedSupplier={setPositionSelectedSupplier} />
              </div>

              <div className='d-flex flex-column'>
                <p className='mt-2 mb-2'>Productos</p>

                <button type="button" className="btn btn-outline-light mb-4 mt-2" data-bs-toggle="modal" data-bs-target="#addProductModal">Agregar Producto</button>
                <ViewProductsDetailOrderPurchase products={products} onRemoveProduct={onRemoveProduct} />
              </div>

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
