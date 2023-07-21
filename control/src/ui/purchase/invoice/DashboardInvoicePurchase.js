import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { storageConfig, getJsonItem } from "util/storage-util";

import ErrorModal from "ui/components/modal/error/ErrorModal";
import { useErrorModal } from "ui/components/modal/error/useErrorModal";

import Navbar from 'ui/components/navbar';
import Navigator from 'ui/components/navigator';
import Loading from "ui/components/loading";

export default function DashboardInvoicePurchase() {
  const navigate = useNavigate();
  let { spreadsheetId } = useParams();

  // Error
  const [isLoading, setIsLoading] = useState(false);
  const { errorModalData, showErrorModal } = useErrorModal(defaultDismissAction);

  function defaultDismissAction() {
    setIsLoading(false);
  }

  function navigateUp() {
    navigate('/feature');
  }

  useEffect(() => {

  }, []);

  return (
    <div>
      <ErrorModal data={errorModalData} />
      <Navbar />

      {isLoading ? (
        <Loading />
      ) : (
        <div className='container d-flex flex-column'>
          <Navigator navigateTo="/feature" />

          <div className='mt-4'>
            <div className='fs-4 mb-2'>Facturas</div>
            <hr></hr>
            <p>Modulo que maneja las facturas.</p>
          </div>

          <div className="d-flex flex-column bg-body-tertiary p-3">
            <div className='fs-6 fw-bold'>Opciones</div>
            <hr></hr>
            <Link className="d-grid gap-2 text-light text-decoration-none" to={'/purchase/invoice/' + spreadsheetId + '/add'}>
              <button className="btn btn-outline-light text-start">Nueva factura</button>
            </Link>
          </div>

          <div className='mt-4'>
            <p className='fw-light text-uppercase mt-4 mb-2'>Facturas</p>
          </div>
        </div>
      )}
    </div>
  );
}