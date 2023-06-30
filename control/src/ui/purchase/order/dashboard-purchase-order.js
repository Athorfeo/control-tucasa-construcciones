import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Navigator from '../../components/navigator';
import Loading from "../../components/loading";
import { Link, useParams } from "react-router-dom";
import { fetchAllOrderPurchase } from "../../../network/purchase-api"
import { storageConfig, getJsonItem } from "../../../util/storage-util"


function DashboardPurchaseOrder() {
  let { spreadsheetId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const offset = 2;
  const [pendingPurchases, setPendingPurchases] = useState([]);
  const [closedPurchases, seClosedPurchases] = useState([]);

  useEffect(() => {
    fetchOrderPurchase();
  }, []);

  async function fetchOrderPurchase() {
    try {
      setIsLoading(true);
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
    if(response.data.values == undefined) {
      setIsLoading(false);
      return;
    }
    const purchases = response.data.values;
    const _purchases = [];
    const _pendingPurchases = [];
    const _closedPurchases = [];

    var lastId = -1;
    var startPositionInSheet = 1 + offset;
    var endPositionInSheet = -1;

    purchases.forEach((item, index) => {
      if (lastId !== item[0]) {
        lastId = item[0];
        startPositionInSheet = (index + (1 + offset));

        //Actualizar el endpositionInSheet del anterior item purchase ya que se encontro uno nuevo
        if (_purchases.length > 0) {
          _purchases[_purchases.length - 1].endPosition = endPositionInSheet;
        }

        _purchases.push({
          item: item,
          isPending: (parseInt(item[7]) === 0) ? true : false,
          startPosition: startPositionInSheet,
          endPosition: endPositionInSheet,
        });
      } else {
        //Actualizo la ultima posicion
        endPositionInSheet = (index + (1 + offset));
      }

      if (index + 1 === purchases.length) {
        _purchases[_purchases.length - 1].endPosition = (index + (1 + offset));
      }
    });
    console.log(_purchases);
    const userSession = getJsonItem(storageConfig.userDataKey);
    _purchases
    .sort((a, b) => parseInt(b.item[0]) - parseInt(a.item[0]))
    .forEach((item, index) => {
      if (item.isPending) {
        _pendingPurchases.push(purchaseToPurchaseView(item, parseInt(userSession.rol)));
        setPendingPurchases(_pendingPurchases);
      } else {
        _closedPurchases.push(purchaseToPurchaseView(item, parseInt(userSession.rol)));
        seClosedPurchases(_closedPurchases);
      }
    });

    setIsLoading(false);
  }

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
                <Link className="gap-2 text-light text-decoration-none" to={'/purchase/order/' + spreadsheetId +'/update' + '/start/' + purchase.startPosition + '/end/' + purchase.endPosition}>
                  <button type="button" className="btn btn-outline-light mt-3">Modificar</button>
                </Link>
              ) : (null)}
              {(userRol > 0) ? (
                <Link className="gap-2 text-light text-decoration-none" to="/purchase-order/detail">
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
          {pendingPurchases}

          <div className='mt-4'>
            <p className='fw-light text-uppercase mt-4 mb-2'>Ordenes Aprobadas</p>
          </div>
          {closedPurchases}
        </div>
      )}
    </div>
  );
}

export default DashboardPurchaseOrder;
