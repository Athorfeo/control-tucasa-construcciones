import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Navigator from '../../components/navigator';
import Loading from "../../components/loading";
import { Link, useParams } from "react-router-dom";
import { storageConfig, getJsonItem } from "util/storage-util"

import { useDashboardOrderPurchase } from "./hook/useDashboardOrderPurchase"
import ViewItemOrderPurchase from "./view/ViewItemOrderPurchase";


function DashboardPurchaseOrder() {
  let { spreadsheetId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userRol, setUserRol] = useState(null);
  const { pendingPurchases, closedPurchases, getAllOrderPurchase, downloadPDF } = useDashboardOrderPurchase(spreadsheetId);

  useDashboardOrderPurchase()

  useEffect(() => {
    setIsLoading(true);
    const userSession = getJsonItem(storageConfig.userDataKey);
    setUserRol(parseInt(userSession.rol));
  }, []);

  useEffect(() => {
    if (userRol != null) {
      getAllOrderPurchase().then(() => {
        setIsLoading(false);
      });
    }
  }, [userRol]);

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
          <ViewItemOrderPurchase spreadsheetId={spreadsheetId} ordersPurchase={pendingPurchases} userRol={userRol} />

          <div className='mt-4'>
            <p className='fw-light text-uppercase mt-4 mb-2'>Ordenes Aprobadas</p>
          </div>
          <ViewItemOrderPurchase spreadsheetId={spreadsheetId} ordersPurchase={closedPurchases} userRol={userRol} downloadPDF={downloadPDF} />
        </div>
      )}
    </div>
  );
}

export default DashboardPurchaseOrder;
