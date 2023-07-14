import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { storageConfig, getJsonItem } from "util/storage-util";

import ErrorModal from "ui/components/modal/error/ErrorModal";
import { useErrorModal } from "ui/components/modal/error/useErrorModal";

import { useMinuteServiceController } from "./useMinuteServiceController";

import Navbar from 'ui/components/navbar';
import Navigator from 'ui/components/navigator';
import Loading from "ui/components/loading";
import ItemView from "./ItemView";

export default function DashboardMinuteService() {
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

  // Logic
  const [userRol, setUserRol] = useState(null);
  const { pendingPurchases, closedPurchases, getAll } = useMinuteServiceController(spreadsheetId);

  useEffect(() => {
    setIsLoading(true);
    const userSession = getJsonItem(storageConfig.userDataKey);
    setUserRol(parseInt(userSession.rol));
  }, []);

  useEffect(() => {
    if (userRol != null) {
      getAll()
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          showErrorModal({
            error: error,
            onDismissAction: () => {
              navigateUp();
            }
          })
        });
    }
  }, [userRol]);

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
            <div className='fs-4 mb-2'>Acta de avance de obra</div>
            <hr></hr>
            <p>Modulo que maneja las actas de avance de obra.</p>
          </div>

          <div className="d-flex flex-column bg-body-tertiary p-3">
            <div className='fs-6 fw-bold'>Opciones</div>
            <hr></hr>
            <Link className="d-grid gap-2 text-light text-decoration-none" to={'/service/minute/' + spreadsheetId + '/add'}>
              <button className="btn btn-outline-light text-start">Nueva Acta de Avance de Obra</button>
            </Link>
          </div>

          <div className='mt-4'>
            <p className='fw-light text-uppercase mt-4 mb-2'>Actas Pendientes</p>
          </div>
          <ItemView spreadsheetId={spreadsheetId} ordersPurchase={pendingPurchases} userRol={userRol} />

          <div className='mt-4'>
            <p className='fw-light text-uppercase mt-4 mb-2'>Actas Aprobadas</p>
          </div>
          <ItemView spreadsheetId={spreadsheetId} ordersPurchase={closedPurchases} userRol={userRol} />
        </div>
      )}
    </div>
  );
}
