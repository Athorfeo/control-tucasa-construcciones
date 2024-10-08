import { useState } from 'react';
import { useSuppliersRepository } from "data/repository/useSuppliersRepository";

export const useSuppliersOrderPurchase = ({spreadsheetId}) => {
  const [suppliers, setSuppliers] = useState([]);
  const [positionSelectedSupplier, setPositionSelectedSupplier] = useState(0);

  const { fetchAllSuppliersService } = useSuppliersRepository();

  async function fetchSuppliers() {
    return fetchAllSuppliersService().then((response) => {
      console.log(response);
      setSuppliers(response.data);
    });
  }

  function loadSupplier(supplierName){
    const index = suppliers.findIndex(item => (item.firstName + " " + item.lastName) === supplierName)
    setPositionSelectedSupplier(index);
  }

  return {
    suppliers,
    positionSelectedSupplier,
    setPositionSelectedSupplier,
    fetchSuppliers,
    loadSupplier
  };
}