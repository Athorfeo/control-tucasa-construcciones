import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { storageConfig, getJsonItem } from "util/storage-util";

import { isAdminRol, isSuperAdminRol, isAssistantRol } from "util/session-util";

import ErrorModal from "ui/components/modal/error/ErrorModal";

import Navbar from 'ui/components/navbar';
import Navigator from 'ui/components/navigator';
import Loading from "ui/components/loading";

import { useDashboardPettyCashPurchaseController as useController } from "./useDashboardPettyCashPurchaseController";
import ViewItemPettyCash from "./ViewItemPettyCash";

export default function DashboardPettyCashPurchase() {
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
            <div className='fs-4 mb-2'>Caja Menor</div>
            <hr></hr>
            <p>Modulo que maneja las factura de Caja Menor.</p>
          </div>

          {(isAssistantRol(userRol) || isAdminRol(userRol) || isSuperAdminRol(userRol)) ? (
            <div className="d-flex flex-column bg-body-tertiary p-3">
              <div className='fs-6 fw-bold'>Opciones</div>
              <hr></hr>
              <Link className="d-grid gap-2 text-light text-decoration-none" to={'/purchase/pettycash/' + spreadsheetId + '/add'}>
                <button className="btn btn-outline-light text-start">Nueva factura de Caja Menor</button>
              </Link>
            </div>
          ) : null}

          <div className='mt-4'>
            <p className='fw-bold text-uppercase mt-4 mb-2'>Lista de facturas de caja menor</p>
            <ViewItemPettyCash spreadsheetId={spreadsheetId} userRol={userRol} data={dataState.pettyCash} />
          </div>
        </div>
      )}
    </div>
  );
}