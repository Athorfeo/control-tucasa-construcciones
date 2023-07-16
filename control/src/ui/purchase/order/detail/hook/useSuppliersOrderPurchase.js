import { useState } from 'react';
import { fetchAllSuppliers } from "network/data-api";

export const useSuppliersOrderPurchase = ({spreadsheetId}) => {
  const [suppliers, setSuppliers] = useState([]);
  const [positionSelectedSupplier, setPositionSelectedSupplier] = useState(0);

  async function fetchSuppliers() {
    return fetchAllSuppliers(spreadsheetId).then((response) => {
      console.log(response);
      setSuppliers(response.data.suppliers);
    });
  }

  function loadSupplier(supplierName){
    const index = suppliers.findIndex(item => (item[1] + " " + item[2]) === supplierName)
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