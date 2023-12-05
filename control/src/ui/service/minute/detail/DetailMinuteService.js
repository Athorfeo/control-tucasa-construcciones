import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { storageConfig, getJsonItem } from "util/storage-util"

import ErrorModal from "ui/components/modal/error/ErrorModal";
import { useErrorModal } from "ui/components/modal/error/useErrorModal";
import FinishModal from "ui/components/modal/finish/FinishModal";
import { useFinishModal } from "ui/components/modal/finish/useFinishModal";

import Navbar from 'ui/components/navbar';
import Navigator from 'ui/components/navigator';
import Loading from "ui/components/loading";

import ActivitiesView from "./ActivitiesView";
import AddActivityView from "./AddActivityView";
import SetExecutedQuantityActivityView from "./SetExecutedQuantityActivityView";

import { useDetailMinuteServiceController } from "./useDetailMinuteServiceController";
import { useActivities } from "./useActivities";

function DetailMinuteService() {
  let { spreadsheetId, action, start, end } = useParams();
  const userRol = parseInt(getJsonItem(storageConfig.userDataKey).rol);
  const navigate = useNavigate();

  // Error
  const [isLoading, setIsLoading] = useState(false);
  const { errorModalData, showErrorModal } = useErrorModal(defaultDismissAction);
  const { finishModalData, showFinishDialog } = useFinishModal();

  function defaultDismissAction() {
    setIsLoading(false);
  }

  function navigateUp() {
    navigate('/service/minute/' + spreadsheetId);
  }

  const { activities, onRemoveActivity, onAddActivity, onSetExecutedQuantity, onSelectActivityForExecutedQuantity, onLoadActivities  } = useActivities();
  const { observations, startDate, endDate, setObservations, onUpdateStartDate, onUpdateEndDate, getByRange, append, update, approve } = useDetailMinuteServiceController(spreadsheetId);

  //UI
  const [isFormDisable, setIsFormDisable] = useState(false);
  const [labelSubmitButton, setLabelSubmitButton] = useState('');
  const [titleAction, setTitleAction] = useState('');

  const isSubmitButtonDisabled = () => {
    switch (action) {
      case 'add':
        if(activities.length > 0 ) {
          return false;
        } else {
          return true;
        }
      case 'update':
        if(activities.length > 0 ) {
          return false;
        } else {
          return true;
        }
      case 'approve':
        let isReadyToApprove = true;
        activities.forEach((item) => {
          if(parseInt(item.executedQuantity) <= 0 ) {
            isReadyToApprove = false;
            return;
          }
        });
        return !isReadyToApprove;
      case 'detail':
          return true;
      default:
        return false;
    }
  }

  // Load Order Purchase
  useEffect(() => {
    switch (action) {
      case 'add':
        setTitleAction('Nueva');
        setLabelSubmitButton("Agregar Acta");
        break;
      case 'update':
        setTitleAction('Modificar');
        setLabelSubmitButton("Modificar Acta")
        fetchData();
        break;
      case 'approve':
        setTitleAction('Aprobar');
        setLabelSubmitButton("Aprobar Acta");
        setIsFormDisable(true);
        fetchData();
        break;
      case 'detail':
        setTitleAction('Detalle');
        setLabelSubmitButton("Modificar Acta");
        setIsFormDisable(true);
        fetchData();
        break;
      default:
    }
  }, []);

  // Fetch Minute Service
  async function fetchData() {
    setIsLoading(true);
    getByRange(start, end)
      .then((response) => {
        console.log(response);
        setObservations(response.data.values[0][2]);
        onUpdateStartDate(response.data.values[0][3]);
        onUpdateEndDate(response.data.values[0][4]);
        onLoadActivities(response.data.values);
        setIsLoading(false);
      })
      .catch((error) => {
        showErrorModal({
          error: error,
          onDismissAction: () => navigateUp()
        });
      });;
  }

  // Form
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      observations: observations,
      startDate: startDate,
      endDate: endDate,
      activities: activities
    };

    switch (action) {
      case 'add':
        handleAppend(data);
        break;
      case 'update':
        handleUpdate(data);
        break;
      case 'approve':
        handleApprove(data);
        break;
      default:
    }
  };

  // Append
  async function handleAppend(data) {
    setIsLoading(true);
    append(data)
      .then((response) => {
        showFinishDialog({
          title: 'Agregado correctamente',
          message: 'El acta de avance de obra se ha agregado exitosamente. Pulse el boton para finalizar.',
          labelButton: 'Finalizar',
          onDismissAction: () => navigateUp()
        });
      })
      .catch((error) => {
        showErrorModal({
          error: error,
          onDismissAction: () => navigateUp()
        });
      });
  }

  // Update
  async function handleUpdate(data) {
    setIsLoading(true);
    update(start, end, data)
      .then((response) => {
        showFinishDialog({
          title: 'Actualizado correctamente',
          message: 'El acta de avance de obra se ha actualizado exitosamente. Pulse el boton para finalizar.',
          labelButton: 'Finalizar',
          onDismissAction: () => navigateUp()
        });
      })
      .catch((error) => {
        showErrorModal({
          error: error
        });
      });
  }

  // Approve
  async function handleApprove(data) {
    setIsLoading(true);
    approve(start, end, data)
      .then((response) => {
        showFinishDialog({
          title: 'Aprobado correctamente',
          message: 'El acta de avance de obra se ha aprobado exitosamente. Pulse el boton para finalizar.',
          labelButton: 'Finalizar',
          onDismissAction: () => navigateUp()
        });
      })
      .catch((error) => {
        showErrorModal({
          error: error
        });
      });
  }

  return (
    <div>
      <Navbar />
      <ErrorModal data={errorModalData} />
      <FinishModal data={finishModalData} />
      <AddActivityView onAdd={onAddActivity} />
      <SetExecutedQuantityActivityView onSetExecutedQuantity={onSetExecutedQuantity} />

      {isLoading ? (
        <Loading />
      ) : (
        <div className='container d-flex flex-column'>
          <Navigator navigateTo={'/service/minute/' + spreadsheetId} />

          <div className='d-flex flex-row border-bottom fs-4 mb-2 mt-4'>
            <div className='p-3 mb-2 border-end'>{titleAction}</div>
            <div className='p-3'>Acta de Avance de Obra</div>
          </div>

          <p>Modulo dedicado a la creacion, modificacion o aprobacion de Actas de avance de Obra. Cada Acta esta compuesta por: Observaciones, Fecha Inicial, Fecha Final y los actividades a realizar.</p>
          <p>Verifica que todos los campos esten correctos antes de enviar el Acta. Recuerda que el Acta de Avance de Obra se puede modificar hasta que se apruebe.</p>

          <form onSubmit={handleSubmit}>
            <div className='container-fluid d-flex flex-column p-3 mb-2 bg-body-tertiary'>
              <div className='container-fluid p-0 d-flex flex-column'>
                <div className="mb-3">
                  <label htmlFor="labelDescription" className="form-label">Observaciones</label>
                  <textarea className="form-control" id="inputDescription" rows="3" value={observations} onChange={(e) => setObservations(e.target.value)} required disabled={isFormDisable}></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="labelDescription" className="form-label">Fecha inicial</label>
                  <input className="form-control" id="inputStartDate" type="date" value={startDate} onChange={(e) => onUpdateStartDate(e.target.value)} required disabled={isFormDisable} />
                </div>

                <div className="mb-3">
                  <label htmlFor="labelDescription" className="form-label">Fecha Final</label>
                  <input className="form-control" id="inputStartDate" type="date" value={endDate} onChange={(e) => onUpdateEndDate(e.target.value)} required disabled={isFormDisable} />
                </div>

              </div>

              <div className='d-flex flex-column'>
                <p className='mt-2 mb-2'>Actividades</p>

                <button type="button" className="btn btn-outline-light mb-4 mt-2" data-bs-toggle="modal" data-bs-target="#addProductModal" disabled={isFormDisable}>Agregar Actividad</button>
                <ActivitiesView data={activities} onRemove={onRemoveActivity} isFormDisable={isFormDisable} userRol={userRol} onSelectActivityForExecutedQuantity={onSelectActivityForExecutedQuantity} />
              </div>

              <div className='d-flex flex-row justify-content-end border-top mt-3'>
                <button type="submit" className="btn btn-light mt-3" disabled={isSubmitButtonDisabled()}>{labelSubmitButton}</button>
              </div>
            </div>

          </form>
        </div>
      )}
    </div>
  );
}

export default DetailMinuteService;