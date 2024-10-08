import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { storageConfig, getJsonItem } from "util/storage-util";

import { isAdminRol, isSuperAdminRol, isAssistantRol } from "util/session-util";

import ErrorModal from "ui/components/modal/error/ErrorModal";

import Navbar from 'ui/components/navbar';
import Navigator from 'ui/components/navigator';
import Loading from "ui/components/loading";

import { useDashboardSuppliersController as useController } from "./useDashboardSuppliersController";
import ItemDashboardSuppliersView from "./ItemDashboardSuppliersView";

export default function DashboardSuppliersView() {
  const navigate = useNavigate();

  const userSession = getJsonItem(storageConfig.userDataKey);
  const userRol = parseInt(userSession.rol);

  function navigateUp() {
    navigate('/feature');
  }

  const { errorModalData, uiLogicState, dataState } = useController(navigateUp);

  return (
    <div>
      <ErrorModal data={errorModalData} />
      <Navbar />

      {uiLogicState.isLoading ? (
        <Loading />
      ) : (
        <div className='container d-flex flex-column'>
          <Navigator navigateTo="/feature" isRootView={true}/>

          <div className='mt-4'>
            <div className='fs-4 mb-2'>Proveedores</div>
            <hr></hr>
            <p>Modulo de gestion de Proveedores.</p>
          </div>

          {(isAssistantRol(userRol) || isAdminRol(userRol) || isSuperAdminRol(userRol)) ? (
            <div className="d-flex flex-column bg-body-tertiary p-3">
              <div className='fs-6 fw-bold'>Opciones</div>
              <hr></hr>
              <Link className="d-grid gap-2 text-light text-decoration-none" to={'/suppliers/add'}>
                <button className="btn btn-outline-light text-start">Nuevo Proveedor</button>
              </Link>
            </div>
          ) : null}

          <div className='mt-4'>
            <p className='fw-bold text-uppercase mt-4 mb-2'>Lista de facturas de caja menor</p>
            <ItemDashboardSuppliersView userRol={userRol} data={dataState.suppliers} />
          </div>
        </div>
      )}
    </div>
  );
}
