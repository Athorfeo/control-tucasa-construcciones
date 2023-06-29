import { useState, useParams } from 'react';
import { fetchAllSuppliers } from "network/data-api";
import * as bootstrap from 'bootstrap';

export const useSuppliersOrderPurchase = ({spreadsheetId}) => {
  const [suppliers, setSuppliers] = useState([]);
  const [positionSelectedSupplier, setPositionSelectedSupplier] = useState('0');

  async function fetchSuppliers() {
    return await fetchAllSuppliers(spreadsheetId).then((response) => {
      setSuppliers(response.data.suppliers);
    });
  }

  return {
    suppliers,
    positionSelectedSupplier,
    setPositionSelectedSupplier,
    fetchSuppliers
  };
}