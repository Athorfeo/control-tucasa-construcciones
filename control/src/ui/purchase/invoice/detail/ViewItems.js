import React from 'react';
import { setCurrencyFormat } from "util/currencyUtil";

function ViewItems({ data, isFormDisable, onRemoveItem }) {
  const items = data.map((item, index) => {
    return <div className='container-fluid d-flex flex-column p-3 mb-2 bg-secondary-subtle' key={index + 1}>
      <div className='container-fluid p-0 d-flex flex-column'>
        <div className='d-flex flex-row d-flex justify-content-between'>
          <div className='fw-bold'>Descripcion</div>
          <div className='fw-bold'>#{index + 1}</div>
        </div>
        <div className='fw-light'>{item.activityMaterial}</div>


        <div className='fw-bold mt-2'>Precio</div>
        <div className='fw-light'>${setCurrencyFormat(item.price)}</div>

        <div className='fw-bold mt-2'>Cantidad</div>
        <div className='fw-light'>{item.quantity}</div>

        <div className='fw-bold mt-2'>Capitulo</div>
        <div className='fw-light'>{item.chapter}</div>
      </div>

      <div className='d-flex flex-row justify-content-end border-top mt-3'>
        {!isFormDisable ? (
          <button type="button" className="btn btn-outline-light mt-3" onClick={(e) => onRemoveItem(index)}><i className="bi bi-x-lg"></i> Eliminar</button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  });

  const view = (data.length > 0 ? (
    items
  ) : (
    <div>No hay items añadidos</div>
  )
  );

  return view;
};

export default ViewItems;