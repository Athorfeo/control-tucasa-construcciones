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

  const { errorModalData, showErrorModal } = useErrorModal(defaultDismissAction);
  const { finishModalData, showFinishDialog } = useFinishModal();

  const { products, onRemoveProduct, onAddProduct, loadProducts } = useProductsOrderPurchase();
  const { suppliers, positionSelectedSupplier, setPositionSelectedSupplier, fetchSuppliers, loadSupplier } = useSuppliersOrderPurchase(spreadsheetId);
  const { description, setDescription, appendOrderPurchase, getOrderPurchaseByRange, updateOrderPurchase, approveOrderPurchase } = useDetailOrderPurchase(spreadsheetId);

  //UI
  const [isLoading, setIsLoading] = useState(false);
  const [isFormDisable, setIsFormDisable] = useState(false);
  const [labelSubmitButton, setLabelSubmitButton] = useState('');
  const [titleAction, setTitleAction] = useState('');

  function defaultDismissAction() {
    setIsLoading(false);
  }

  // Load initial data (Suppliers)
  useEffect(() => {
    const task = async () => {
      setIsLoading(true);
      fetchSuppliers()
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          showErrorModal({
            error: error
          });
        });
    }

    task();
  }, []);

  // Load Order Purchase
  useEffect(() => {
    switch (action) {
      case 'add':
        setTitleAction('Nueva');
        setLabelSubmitButton("Agregar factura");
        break;
      case 'update':
        setTitleAction('Modificar');
        setLabelSubmitButton("Modificar factura")
        loadOrderPurchase();
        break;
      case 'approve':
        setTitleAction('Aprobar');
        setLabelSubmitButton("Aprobar factura");
        setIsFormDisable(true);
        loadOrderPurchase();
        break;
      default:
    }
  }, [suppliers]);

  // Load Order Purchase
  async function loadOrderPurchase() {
    if (suppliers.length > 0) {
      setIsLoading(true);
      getOrderPurchaseByRange(start, end)
        .then((response) => {
          console.log(response);
          setDescription(response.data.values[0][2]);
          loadSupplier(response.data.values[0][3]);
          loadProducts(response.data.values);
          setIsLoading(false);
        })
        .catch((error) => {
          showErrorModal({
            error: error,
            onDismissAction: () => {
              navigate('/purchase/order/' + spreadsheetId);
            }
          });
        });;
    }
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
        handleAppendOrderPurchase(orderPurchase);
        break;
      case 'update':
        handleUpdateOrderPurchase(orderPurchase);
        break;
      case 'approve':
        handleApproveOrderPurchase();
        break;
      default:
    }
  };

  // Append
  async function handleAppendOrderPurchase(orderPurchase) {
    setIsLoading(true);
    appendOrderPurchase(orderPurchase)
      .then((response) => {
        showFinishDialog({
          title: 'Agregado correctamente',
          message: 'La orden de compra se ha agregado exitosamente. Pulse el boton para finalizar.',
          labelButton: 'Finalizar',
          onDismissAction: () => {
            navigate('/purchase/order/' + spreadsheetId);
          }
        });
      })
      .catch((error) => {
        showErrorModal({
          error: error,
          onDismissAction: () => {
            navigate('/purchase/order/' + spreadsheetId);
          }
        });
      });
  }

  // Update
  async function handleUpdateOrderPurchase(orderPurchase) {
    setIsLoading(true);
    updateOrderPurchase(start, end, orderPurchase)
      .then((response) => {
        showFinishDialog({
          title: 'Actualizado correctamente',
          message: 'La orden de compra se ha actualizado exitosamente. Pulse el boton para finalizar.',
          labelButton: 'Finalizar',
          onDismissAction: () => {
            navigate('/purchase/order/' + spreadsheetId);
          }
        });
      })
      .catch((error) => {
        showErrorModal({
          error: error
        });
      });
  }

  // Approve
  async function handleApproveOrderPurchase() {
    setIsLoading(true);
    approveOrderPurchase(start, end)
      .then((response) => {
        showFinishDialog({
          title: 'Aprobado correctamente',
          message: 'La orden de compra se ha aprobado exitosamente. Pulse el boton para finalizar.',
          labelButton: 'Finalizar',
          onDismissAction: () => {
            navigate('/purchase/order/' + spreadsheetId);
          }
        });
      })
      .catch((error) => {
        showErrorModal({
          error: error
        });
      });
  }

  return (
    <div>
      <Navbar />
      <ErrorModal data={errorModalData} />
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
                  <textarea className="form-control" id="inputDescription" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required disabled={isFormDisable}></textarea>
                </div>

                <ViewSuppliersDetailOrderPurchase suppliers={suppliers} positionSelectedSupplier={positionSelectedSupplier} setPositionSelectedSupplier={setPositionSelectedSupplier} isFormDisable={isFormDisable}/>
              </div>

              <div className='d-flex flex-column'>
                <p className='mt-2 mb-2'>Productos</p>

                <button type="button" className="btn btn-outline-light mb-4 mt-2" data-bs-toggle="modal" data-bs-target="#addProductModal" disabled={isFormDisable}>Agregar Producto</button>
                <ViewProductsDetailOrderPurchase products={products} onRemoveProduct={onRemoveProduct} isFormDisable={isFormDisable} />
              </div>

              <div className='d-flex flex-row justify-content-end border-top mt-3'>
                <button type="submit" className="btn btn-light mt-3">{labelSubmitButton}</button>
              </div>
            </div>

          </form>
        </div>
      )}
    </div>
  );
}

export default DetailPurchaseOrder;
