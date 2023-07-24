import { useState } from 'react';
import { fetchAll } from "network/api/minuteServiceApi"

export const useMinuteServiceController = (spreadsheetId) => {
  const offset = 2;

  const [pendingPurchases, setPendingPurchases] = useState([]);
  const [closedPurchases, seClosedPurchases] = useState([]);

  async function getAll() {
    return await fetchAll(spreadsheetId).then((response) => {
      console.log(response);
      handleAllOrderPurchaseResponse(response);
    });
  }

  function handleAllOrderPurchaseResponse(response) {
    if (response.data.values === undefined) {
      return;
    }

    const purchases = response.data.values;
    const _purchases = [];
    const _pendingPurchases = [];
    const _closedPurchases = [];

    var _items = [];
    var lastId = -1;
    var startPositionInSheet = 1 + offset;
    var endPositionInSheet = -1;

    purchases.forEach((item, index) => {
      if (lastId !== item[0]) {
        lastId = item[0];
        startPositionInSheet = (index + (1 + offset));
        _items = [];
        _items.push(item);

        //Actualizar el endpositionInSheet del anterior item purchase ya que se encontro uno nuevo
        if (_purchases.length > 0) {
          _purchases[_purchases.length - 1].endPosition = endPositionInSheet;
        }
        
        _purchases.push({
          items: _items,
          isPending: (parseInt(item[9]) === 0) ? true : false,
          startPosition: startPositionInSheet,
          endPosition: startPositionInSheet,
        });

        endPositionInSheet = startPositionInSheet;
      } else {
        //Actualizo la ultima posicion
        endPositionInSheet = (index + (1 + offset));
        _items.push(item);
      }

      if (index + 1 === purchases.length) {
        _purchases[_purchases.length - 1].endPosition = (index + (1 + offset));
      }
    });

    console.log("Items");
    console.log(_purchases);

    _purchases
      .sort((a, b) => parseInt(b.items[0][0]) - parseInt(a.items[0][0]))
      .forEach((item, index) => {
        if (item.isPending) {
          _pendingPurchases.push(item);
          setPendingPurchases(_pendingPurchases);
        } else {
          _closedPurchases.push(item);
          seClosedPurchases(_closedPurchases);
        }
      });
  }

  return {
    pendingPurchases,
    closedPurchases,
    getAll
  };
}