import React from 'react';

export default function ViewProductsDetailOrderPurchase({ products, onRemoveProduct, isFormDisable }) {
  const items = products.map((item, index) => {
    return <div className='container-fluid d-flex flex-column p-3 mb-2 bg-secondary-subtle' key={index + 1}>
      <div className='container-fluid p-0 d-flex flex-column'>
        <div className='d-flex flex-row d-flex justify-content-between'>
          <div className='fw-bold'>Nombre del producto</div>
          <div className='fw-bold'>#{index + 1}</div>
        </div>
        <div className='fw-light'>{item.productName}</div>


        <div className='fw-bold mt-2'>Cantidad</div>
        <div className='fw-light'>{item.productQuantity}</div>

        <div className='fw-bold mt-2'>Capitulo</div>
        <div className='fw-light'>{item.chapterName}</div>
      </div>

      <div className='d-flex flex-row justify-content-end border-top mt-3'>
        {!isFormDisable ? (
          <button type="button" className="btn btn-outline-light mt-3" onClick={(e) => onRemoveProduct(index)}><i className="bi bi-x-lg"></i> Eliminar</button>
        ) : (
          <div></div>
        )}
        
      </div>
    </div>
  });

  const view = (
    products.length > 0 ? (
      items
    ) : (
      <div>No hay productos añadidos</div>
    )
  );

  return view;
};