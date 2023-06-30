import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ErrorModal from "ui/components/modal/error/ErrorModal";
import { useErrorModal } from "ui/components/modal/error/useErrorModal";
import FinishModal from "ui/components/modal/finish/FinishModal";
import { useFinishModal } from "ui/components/modal/finish/useFinishModal";

import { useDetailOrderPurchase } from "./hook/useDetailOrderPurchase";

import ViewProductsDetailOrderPurchase from "./view/ViewProductsDetailOrderPurchase";
import { useProductsOrderPurchase } from "./hook/useProductsOrderPurchase";
import ViewSuppliersDetailOrderPurchase from "./view/ViewSuppliersDetailOrderPurchase";
import { useSuppliersOrderPurchase } from "./hook/useSuppliersOrderPurchase";

import Navbar from 'ui/components/navbar';
import Navigator from 'ui/components/navigator';
import Loading from "ui/components/loading";
import ViewAddProductDetailOrderPurchase from "./view/ViewAddProductDetailOrderPurchase";


function DetailPurchaseOrder() {
  let { spreadsheetId, action, start, end } = useParams();
  const navigate = useNavigate();

  const { errorModalData, tryExecute } = useErrorModal(defaultDismissAction);
  const { finishModalData, showFinishDialog } = useFinishModal();

  const { products, setProducts, onRemoveProduct, onAddProduct } = useProductsOrderPurchase();
  const { suppliers, positionSelectedSupplier, setPositionSelectedSupplier, fetchSuppliers } = useSuppliersOrderPurchase(spreadsheetId);
  const { description, setDescription, appendOrderPurchase } = useDetailOrderPurchase(spreadsheetId);

  //UI
  const [isLoading, setIsLoading] = useState(false);
  const [titleAction, setTitleAction] = useState('');

  function defaultDismissAction() {
    setIsLoading(false);
  }

  // Services
  useEffect(() => {
    const task = async () => {
      switch (action) {
        case 'add':
          setTitleAction('Nueva');
          handleFetchSuppliers();
          break;
        case 'update':
          setTitleAction('Modificar');
          break;
        case 'approve':
          setTitleAction('Aprobar');
          break;
        default:
      }
    }

    task();
  }, []);

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
        handleAppendOrderPurchase(orderPurchase);
        break;
      case 'update':
        break;
      case 'approve':
        break;
      default:
    }
  };

  async function handleFetchSuppliers() {
    setIsLoading(true);
    tryExecute({
      block: () => {
        fetchSuppliers().then(() => {setIsLoading(false);});
      }
    });
  }

  async function handleAppendOrderPurchase(orderPurchase) {
    setIsLoading(true);
    tryExecute({
      block: () => {
        appendOrderPurchase(orderPurchase).then((response) => {
          showFinishDialog({
            title: 'Agregado correctamente',
            message: 'La orden de compra se ha agregado exitosamente. Pulse el boton para finalizar.',
            labelButton: 'Finalizar',
            onDismissAction: () => {
              navigate('/purchase/order/' + spreadsheetId);
            }
          });
        });
      }
    });
  }

  return (
    <div>
      <Navbar />
      <ErrorModal data={errorModalData}/>
      <FinishModal data={finishModalData} />
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
