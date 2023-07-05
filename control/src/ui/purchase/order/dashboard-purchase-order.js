import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Navigator from '../../components/navigator';
import Loading from "../../components/loading";
import { Link, useParams } from "react-router-dom";
import { storageConfig, getJsonItem } from "util/storage-util"

import { useDashboardOrderPurchase } from "./hook/useDashboardOrderPurchase"
import ViewSuppliersDetailOrderPurchase from "./view/ViewItemOrderPurchase";


function DashboardPurchaseOrder() {
  let { spreadsheetId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userRol, setUserRol] = useState(-1);
  const { pendingPurchases, closedPurchases, getAllOrderPurchase, downloadPDF } = useDashboardOrderPurchase(spreadsheetId);

  useDashboardOrderPurchase()

  useEffect(() => {
    setIsLoading(true);
    const userSession = getJsonItem(storageConfig.userDataKey);
    setUserRol(parseInt(userSession.rol));
  }, []);

  useEffect(() => {
    if (userRol > 0) {
      getAllOrderPurchase().then(() => {
        setIsLoading(false);
      });
    }
  }, [userRol]);

  const purchaseToPurchaseView = (purchase, userRol) => {
    var view = (
      <div className='container-fluid d-flex flex-column p-3 mb-2 bg-body-tertiary' key={purchase.item[0]}>
        <div className='container-fluid p-0 d-flex flex-column'>
          <div className='d-flex flex-row'>
            <div className='fw-bold'>#{purchase.item[0]}</div>
            <div className='fw-light ms-2'>{purchase.item[3]}</div>
          </div>

          <div className='fw-light mt-2'>{purchase.item[2]}</div>
        </div>

        <div className='d-flex flex-row justify-content-end border-top mt-3'>
          {purchase.isPending ? (
            <div>
              {(userRol === 0 || userRol === 1) ? (
                <Link className="gap-2 text-light text-decoration-none" to={'/purchase/order/' + spreadsheetId + '/update' + '/start/' + purchase.startPosition + '/end/' + purchase.endPosition}>
                  <button type="button" className="btn btn-outline-light mt-3">Modificar</button>
                </Link>
              ) : (null)}
              {(userRol > 0) ? (
                <Link className="gap-2 text-light text-decoration-none" to={'/purchase/order/' + spreadsheetId + '/approve' + '/start/' + purchase.startPosition + '/end/' + purchase.endPosition}>
                  <button type="button" className="btn btn-outline-light mt-3 ms-3">Aprobar</button>
                </Link>
              ) : (null)}
            </div>
          ) : (
            <div>{(userRol > 0) ? (
              <Link className="gap-2 text-light text-decoration-none" to="/purchase-order/detail">
                <button type="button" className="btn btn-outline-light mt-3">Descargar PDF</button>
              </Link>
            ) : (null)}</div>
          )}
        </div>
      </div>
    );

    return view;
  }

  return (
    <div>
      <Navbar />

      {isLoading ? (
        <Loading />
      ) : (
        <div className='container d-flex flex-column'>
          <Navigator navigateTo="/feature" />

          <div className='mt-4'>
            <div className='fs-4 mb-2'>Orden de compra</div>
            <hr></hr>
            <p>Modulo que maneja las ordenes de compra.</p>
          </div>

          <div className="d-flex flex-column bg-body-tertiary p-3">
            <div className='fs-6 fw-bold'>Opciones</div>
            <hr></hr>
            <Link className="d-grid gap-2 text-light text-decoration-none" to={'/purchase/order/' + spreadsheetId + '/add'}>
              <button className="btn btn-outline-light text-start">Nueva Orden de Compra</button>
            </Link>
          </div>

          <div className='mt-4'>
            <p className='fw-light text-uppercase mt-4 mb-2'>Ordenes Pendientes</p>
          </div>
          <ViewSuppliersDetailOrderPurchase spreadsheetId={spreadsheetId} ordersPurchase={pendingPurchases} userRol={userRol} />

          <div className='mt-4'>
            <p className='fw-light text-uppercase mt-4 mb-2'>Ordenes Aprobadas</p>
          </div>
          <ViewSuppliersDetailOrderPurchase spreadsheetId={spreadsheetId} ordersPurchase={closedPurchases} userRol={userRol} downloadPDF={downloadPDF} />
        </div>
      )}
    </div>
  );
}

export default DashboardPurchaseOrder;
