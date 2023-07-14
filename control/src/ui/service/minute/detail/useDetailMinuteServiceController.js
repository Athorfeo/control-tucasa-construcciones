import { useState, useEffect } from 'react';
import {
  fetchByRange,
  fetchAppend,
  fetchUpdate,
  fetchApprove
} from "network/minuteServiceApi";
import { storageConfig, getJsonItem } from "util/storage-util";
import { getCurrentDateFormatted } from "util/dateUtil"

export const useDetailMinuteServiceController = (spreadsheetId) => {
  const [observations, setObservations] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const date = getCurrentDateFormatted();
    setStartDate(date);
    setEndDate(date);
  }, []);

  function onUpdateStartDate(value) {
    setStartDate(value);
  }

  function onUpdateEndDate(value) {
    setEndDate(value);
  }

  function getByRange(startPosition, endPosition) {
    return fetchByRange(spreadsheetId, startPosition, endPosition);
  }

  async function append(data) {
    return await fetchAppend(spreadsheetId, data);
  }

  function update(start, end, data) {
    const payload = {
      startPosition: start,
      endPosition: end,
      minuteService: data
    }
    return fetchUpdate(spreadsheetId, payload);
  }

  function approve(start, end, data) {
    const userSession = getJsonItem(storageConfig.userDataKey);

    const activities = [];

    data.activities.forEach(item => {
      activities.push({
        executedQuantity: item.executedQuantity
      });
    });

    const payload = {
      startPosition: start,
      endPosition: end,
      email: userSession.email,
      activities: activities,
    }
    return fetchApprove(spreadsheetId, payload);
  }

  return {
    observations,
    setObservations,
    startDate,
    onUpdateStartDate,
    endDate,
    onUpdateEndDate,
    getByRange,
    append,
    update,
    approve
  };
}