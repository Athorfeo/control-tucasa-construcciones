import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Loading from "../components/loading";
import Navigator from "../components/navigator";
import { isSessionReady } from "../../util/session-util";
import { useNavigate } from "react-router-dom";
import ItemDashboardFeature from "./item-dashboard-feature";
import LabelSectionDashboardFeature from "./label-section-dashboard-feature copy";
import { storageConfig, getJsonItem } from "../../util/storage-util";

function DashboardFeature() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [purchasesSection, setPuchasesSection] = useState([]);
  const [servicesSection, setServicesSection] = useState([]);
  const [clientsSection, setClientsSection] = useState([]);
  const [partnersSection, setPartnersSection] = useState([]);
  const [statementsSection, setStatementsSection] = useState([]);
  const [suppliersSection, setSuppliersSection] = useState([]);
  const [aftersalesSection, setAftersalesSection] = useState([]);

  useEffect(() => {
    const task = async () => {
      setIsLoading(true);
      if (isSessionReady()) {
        const userSession = getJsonItem(storageConfig.userDataKey);
        const selectedProject = getJsonItem(storageConfig.selectedProjectDataKey);

        loadPurchaseFeatures(userSession, selectedProject);
      }
      setIsLoading(false);
    };

    task();
  }, []);

  function loadPurchaseFeatures(userSession, selectedProject) {
    console.log(userSession);
    const features = [];
    features.push(<LabelSectionDashboardFeature title='Compras' key={features.length + 1} />);

    const purchaseOrderRoute = "/purchase/order/" + selectedProject.purchaseOrder;

    switch (userSession.rol) {
      case '0':
        features.push(<ItemDashboardFeature route={purchaseOrderRoute} title='Orden de compra' description='Esta es una descripcion' key={features.length + 1} />);
        break;
      case '1':
        features.push(<ItemDashboardFeature route='/dashboard' title='Caja menor' description='Esta es una descripcion' key={features.length + 1} />);
        features.push(<ItemDashboardFeature route='/dashboard' title='Facturas' description='Esta es una descripcion' key={features.length + 1} />);
        features.push(<ItemDashboardFeature route='/dashboard' title='Impuestos' description='Esta es una descripcion' key={features.length + 1} />);
        features.push(<ItemDashboardFeature route={purchaseOrderRoute} title='Orden de compra' description='Esta es una descripcion' key={features.length + 1} />);
        break;
      default:
        console.log("No default handle!");
    }

    setPuchasesSection(features);
  }

  return (
    <div>
      <Navbar />

      <div className='container d-flex flex-column'>
        <Navigator navigateTo="/dashboard" />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className='container d-flex flex-column'>

          <div className='container mt-4'>
            <div className='fs-4 mb-2'>Opciones</div>
            <hr></hr>
            Funcionalides disponibles
          </div>

          {purchasesSection}

          <LabelSectionDashboardFeature title='Servicios' />
          <ItemDashboardFeature route='/dashboard' title='Actas de avance de obra' description='Esta es una descripcion' />
          <ItemDashboardFeature route='/dashboard' title='Pagos a contratistas' description='Esta es una descripcion' />

          <LabelSectionDashboardFeature title='Clientes' />
          <ItemDashboardFeature route='/dashboard' title='Abonos' description='Esta es una descripcion' />
          <ItemDashboardFeature route='/dashboard' title='Clientes' description='Esta es una descripcion' />

          <LabelSectionDashboardFeature title='Socios' />
          <ItemDashboardFeature route='/dashboard' title='Aportes' description='Esta es una descripcion' />
          <ItemDashboardFeature route='/dashboard' title='Socios' description='Esta es una descripcion' />
          <ItemDashboardFeature route='/dashboard' title='Prestamos' description='Esta es una descripcion' />

          <LabelSectionDashboardFeature title='Extractos' />
          <ItemDashboardFeature route='/dashboard' title='Extractos mensuales bancos' description='Esta es una descripcion' />
          <ItemDashboardFeature route='/dashboard' title='Movimientos semanales bancos' description='Esta es una descripcion' />

          <LabelSectionDashboardFeature title='Proveedores' />
          <ItemDashboardFeature route='/dashboard' title='Dashboard Proveedores' description='Esta es una descripcion' />

          <LabelSectionDashboardFeature title='Postventa' />
          <ItemDashboardFeature route='/dashboard' title='Dashboard Proveedores' description='Esta es una descripcion' />
        </div>
      )}
    </div>
  );
}

export default DashboardFeature;
