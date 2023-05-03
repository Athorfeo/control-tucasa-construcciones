import React, {useState} from 'react';
import Navbar from '../../components/navbar';
import Navigator from '../../components/navigator';

function PurchaseOrder() {
  //Form Purchase Order
  const [description, setDescription] = useState('');
  const [supplier, setSupplier] = useState('');

  const [products, setProducts] = useState([]);

  const removeProduct = (index) => {
    const position = products.indexOf(index);
    if (position > -1) {
      products.splice(position, 1);
    }

    setProducts(products);
  }

  const productView = products.map((item, index) =>
    <tr key={index + 1}>
      <th scope="row">{index + 1}</th>
      <td>{item[0]}</td>
      <td>{item[1]}</td>
      <td>{item[2]}</td>
      <td><button className="ms-2 btn btn-primary" onClick={(e) => removeProduct(index)}>Eliminar</button></td>
  </tr>
  );

  const handlePurchaseOrderSubmit = (e) => {
    e.preventDefault();

    const data = {
      description: description,
      supplier: supplier,
      products: products
    };

    console.log(JSON.stringify(data));
  };

  // Form Add Product
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [chapter, setChapter] = useState('');

  const handleAddProductSubmit = (e) => {
    e.preventDefault();

    products.push([productName, quantity, chapter]);
    setProducts(products);

    setProductName('');
    setQuantity('');
    setChapter('');
  };

  return (
    <div>
      <Navbar />

      <div className="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
        <form onSubmit={handleAddProductSubmit}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar producto</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="mb-3">
                  <label for="inputProductName" className="form-label">Nombre del producto</label>
                  <input type="text" className="form-control" id="inputProductName" aria-describedby="productNameHelp" value={productName} onChange={(e) => setProductName(e.target.value)} required></input>
                  <div id="productNameHelp" className="form-text">Coloca el nombre del producto a agregar.</div>
                </div>

                <div className="mb-3">
                  <label for="inputProductQuantity" className="form-label">Cantidad</label>
                  <input type="number" min="1" max="9999" className="form-control" id="inputProductQuantity" aria-describedby="productQuantityHelp" value={quantity} onChange={(e) => setQuantity(e.target.value)} required></input>
                  <div id="productQuantityHelp" className="form-text">Coloca la cantidad del producto a agregar.</div>
                </div>

                <div className="mb-3">
                  <label for="labelChapter" className="form-label">Capitulo</label>
                    <select className="form-select" aria-label="Default select example" id="inputChapter" value={chapter} onChange={(e) => setChapter(e.target.value)} required>
                      <option selected>Abrir para seleccionar el capitulo</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" className="btn btn-primary" >Agregar</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-sm-8">
            <Navigator navigateTo="/dashboard"/>
            <div className='d-flex flex-column bg-body-secondary rounded p-4 mt-4'>
              <form onSubmit={handlePurchaseOrderSubmit}>
                <div className='fs-5'>Orden de compra</div>
                <hr></hr>
                Rellena todos los campos antes de enviar la Orden de compra

                <div className="mb-3 mt-3">
                  <label for="labelDescription" className="form-label">Descripcion</label>
                  <textarea className="form-control" id="inputDescription" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>

                <div className="mb-3">
                  <label for="labelSupplier" className="form-label">Proveedor</label>
                    <select className="form-select" aria-label="Default select example" id="inputSuplier" value={supplier} onChange={(e) => setSupplier(e.target.value)} required>
                      <option selected>Abrir para seleccionar el proveedor</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                </div>

                <div className='container bg-body-tertiary p-3 mt-5'>
                  <div className='fs-5'>Productos</div>
                </div>

                <button type="button" className="w-100 btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#addProductModal">
                  Agregar producto
                </button>

                <table className="table mt-3">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre del producto</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Capitulo</th>
                      <th scope="col">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productView}
                  </tbody>
                </table>

                <button type="submit" className="btn btn-primary mt-3">Enviar factura</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseOrder;
