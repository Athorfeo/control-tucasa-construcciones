import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Navigator from '../../components/navigator';
import { Link } from "react-router-dom";

function DashboardPurchaseOrder() {
  const [pendingPurchases, setPendingPurchases] = useState([]);
  const [closedPurchases, seClosedPurchases] = useState([]);

  const purchaseToPurchaseView = (item, isPending) => {
    var view = null;

    if (isPending) {
      view = (
        <tr key={item[0]}>
          <th scope="row">{item[0]}</th>
          <td>{item[3]}</td>
          <td>{item[2]}</td>
          <td><button className="ms-2 btn btn-dark">Modificar</button></td>
        </tr>
      );
    } else {
      view = (
        <tr key={item[0]}>
          <th scope="row">{item[0]}</th>
          <td>{item[3]}</td>
          <td>{item[2]}</td>
        </tr>
      );
    }

    return view;
  }

  useEffect(() => {
    const task = async () => {
      const rawData = '{"range":"Sheet1!A1:H1000","majorDimension":"ROWS","values":[["lastId","3"],["id","Fecha","Observaciones","Proveedor Nombre","Articulo","Cantidad","Capitulo","Aprobado"],["1","30/5/2023","None","Supplier Name","Product Name 1","10","PRELIMINAR","0"],["1","30/5/2023","None","Supplier Name","Product Name 2","5","EXCAVACIONES","0"],["2","30/5/2023","None","Supplier Name","Product Name 1","10","PRELIMINAR","1"],["2","30/5/2023","None","Supplier Name","Product Name 2","5","EXCAVACIONES","1"],["3","30/5/2023","None","Supplier Name","Product Name 1","10","PRELIMINAR","0"],["3","30/5/2023","None","Supplier Name","Product Name 2","5","EXCAVACIONES","0"]]}';
      const data = JSON.parse(rawData);

      const purchases = data.values;
      delete purchases[0];
      delete purchases[1];

      const _pendingPurchases = [];
      const _closedPurchases = [];

      var lastId = -1;
      //Ojo que aca inicia
      var startIndex = 0;
      var endIndex = -1;
      

      purchases.forEach((item, index) => {
        if (lastId !== item[0]) {
          lastId = item[0];
          endIndex = index - 1;

          if (parseInt(item[7]) === 0) {
            _pendingPurchases.push(purchaseToPurchaseView(item, true));
            setPendingPurchases(_pendingPurchases);
          } else {
            _closedPurchases.push(purchaseToPurchaseView(item, false));
            seClosedPurchases(_closedPurchases);
          }

          console.log("startIndex: " + startIndex);
          console.log("endIndex: " + endIndex);

          console.log("A" + (startIndex + 3) + ":H" + (endIndex + 3));
          
          startIndex = index;
        }
      });

      console.log(_pendingPurchases);
      console.log(_closedPurchases);
    };

    task();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <Navigator navigateTo="/dashboard" />
        <div className='d-flex flex-column bg-body-secondary rounded p-4 mt-4'>

          <div className='bg-body-tertiary p-3'>
            <div className='fs-5'>Dashboard | Orden de compra</div>
          </div>
          <hr></hr>

          <div>
            <div className="row align-items-start">
              <div className="col">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dictum magna, non scelerisque eros. Fusce blandit aliquam varius. Sed eu semper tortor. Nunc fermentum et augue tristique dictum.
              </div>
              <div className="col bg-body-tertiary p-4">
                <div className='fs-6 fw-bold'>Opciones</div>
                <hr></hr>
                <Link className="d-grid gap-2 text-light text-decoration-none" to="/purchase-order/detail">
                  <button className="btn btn-outline-light text-start">Nueva Orden de Compra</button>
                </Link>
              </div>
            </div>
          </div>

          <div className='fs-6 fw-bold mt-4'>Pendientes</div>
          <table className="table mt-2">
            <caption>Lista de orden de compra pendientes</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Proveedor</th>
                <th scope="col">Observaciones</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody>
              {pendingPurchases}
            </tbody>
          </table>

          <div className='fs-6 fw-bold mt-4'>Cerradas</div>
          <table className="table mt-2">
            <caption>Lista de orden de compra cerradas</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Proveedor</th>
                <th scope="col">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {closedPurchases}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardPurchaseOrder;
