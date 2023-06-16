import React from 'react';

function Loading() {
  return (
    <div className='container mt-4'>
      <div className="alert alert-secondary" role="alert">
        <i className="bi bi-hourglass"></i> Procesando, espere un momento...
      </div>
    </div>
  );
}

export default Loading;
