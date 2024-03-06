import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { storageConfig, getJsonItem } from "util/storage-util";

import { isAdminRol, isSuperAdminRol, isAssistantRol } from "util/session-util";

import ErrorModal from "ui/components/modal/error/ErrorModal";

import Navbar from 'ui/components/navbar';
import Navigator from 'ui/components/navigator';
import Loading from "ui/components/loading";

import { useDashboardClientsController as useController } from "./useDashboardClientsController";
import ViewItemClients from "./ViewItemClients";

export default function DashboardClients() {
  const navigate = useNavigate();
  let { spreadsheetId } = useParams();

  const userSession = getJsonItem(storageConfig.userDataKey);
  const userRol = parseInt(userSession.rol);

  function navigateUp() {
    navigate('/feature');
  }
  const { errorModalData, uiLogicState, dataState } = useController(spreadsheetId, navigateUp);

  return (
    <div>
      <ErrorModal data={errorModalData} />
      <Navbar />

      {uiLogicState.isLoading ? (
        <Loading />
      ) : (
        <div className='container d-flex flex-column'>
          <Navigator navigateTo="/feature" />

          <div className='mt-4'>
            <div className='fs-4 mb-2'>Clients</div>
            <hr></hr>
            <p>Modulo de gestion de clientes.</p>
          </div>

          {(isAssistantRol(userRol) || isAdminRol(userRol) || isSuperAdminRol(userRol)) ? (
            <div className="d-flex flex-column bg-body-tertiary p-3">
              <div className='fs-6 fw-bold'>Opciones</div>
              <hr></hr>
              <Link className="d-grid gap-2 text-light text-decoration-none" to={'/purchase/pettycash/' + spreadsheetId + '/add'}>
                <button className="btn btn-outline-light text-start">Nuevo cliente</button>
              </Link>
            </div>
          ) : null}

          <div className='mt-4'>
            <p className='fw-bold text-uppercase mt-4 mb-2'>Lista de facturas de caja menor</p>
            <ViewItemClients spreadsheetId={spreadsheetId} userRol={userRol} data={dataState.clients} />
          </div>
        </div>
      )}
    </div>
  );
}