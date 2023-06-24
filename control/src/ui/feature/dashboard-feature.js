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
        loadServicesFeatures(userSession, selectedProject);
        loadClientsFeatures(userSession, selectedProject);
        loadPatnersFeatures(userSession, selectedProject);
        loadStatementsFeatures(userSession, selectedProject);
        loadSuppliersFeatures(userSession, selectedProject);
        loadAftersalesFeatures(userSession, selectedProject);
      }
      setIsLoading(false);
    };

    task();
  }, []);

  function loadPurchaseFeatures(userSession, selectedProject) {
    console.log(userSession);
    const features = [];
    const titleKey = 'purchases';
    features.push(<LabelSectionDashboardFeature title='Compras' key={titleKey + (features.length + 1)} />);

    const purchaseOrderRoute = "/purchase/order/" + selectedProject.purchaseOrder;

    switch (userSession.rol) {
      case '0':
        features.push(<ItemDashboardFeature route={purchaseOrderRoute} title='Orden de compra' description='Esta es una descripcion' key={titleKey + (features.length + 1)} isEnable={true} />);
        break;
      case '1':
        features.push(<ItemDashboardFeature route='/dashboard' title='Caja menor' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)}/>);
        features.push(<ItemDashboardFeature route='/dashboard' title='Facturas' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)}/>);
        features.push(<ItemDashboardFeature route='/dashboard' title='Impuestos' description='Esta es una descripcion'isEnable={false}  key={titleKey + (features.length + 1)}/>);
        features.push(<ItemDashboardFeature route={purchaseOrderRoute} title='Orden de compra' description='Esta es una descripcion' isEnable={true} key={titleKey + (features.length + 1)}/>);
        break;
      default:
        console.log("No default handle!");
    }

    setPuchasesSection(features);
  }

  function loadServicesFeatures(userSession, selectedProject) {
    const features = [];
    const titleKey = 'services';

    features.push(<LabelSectionDashboardFeature title='Servicios' key={titleKey + (features.length + 1)}/>);

    switch (userSession.rol) {
      case '0':
        features.push(<ItemDashboardFeature route='/dashboard' title='Actas de avance de obra' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)}/>);
        break;
      case '1':
        features.push(<ItemDashboardFeature route='/dashboard' title='Actas de avance de obra' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);
        features.push(<ItemDashboardFeature route='/dashboard' title='Pagos a contratistas' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);
        break;
      default:
        console.log("No default handle!");
    }

    setServicesSection(features);
  }

  function loadClientsFeatures(userSession, selectedProject) {
    const features = [];
    const titleKey = 'clients';

    switch (userSession.rol) {
      case '0':
        console.log("No rol 0 handle!");
        break;
      case '1':
        features.push(<LabelSectionDashboardFeature title='Clientes' key={titleKey + (features.length + 1)} />);
        features.push(<ItemDashboardFeature route='/dashboard' title='Abonos' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)}  />);
        features.push(<ItemDashboardFeature route='/dashboard' title='Clientes' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);
        break;
      default:
        console.log("No default handle!");
    }

    setClientsSection(features);
  }

  function loadPatnersFeatures(userSession, selectedProject) {
    const features = [];
    const titleKey = 'patners';

    switch (userSession.rol) {
      case '0':
        console.log("No rol 0 handle!");
        break;
      case '1':
        features.push(<LabelSectionDashboardFeature title='Socios' key={titleKey + (features.length + 1)} />);
        features.push(<ItemDashboardFeature route='/dashboard' title='Aportes' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)}  />);
        features.push(<ItemDashboardFeature route='/dashboard' title='Socios' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);
        features.push(<ItemDashboardFeature route='/dashboard' title='Prestamos' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);
        break;
      default:
        console.log("No default handle!");
    }

    setPartnersSection(features);
  }

  function loadStatementsFeatures(userSession, selectedProject) {
    const features = [];
    const titleKey = 'statements';

    switch (userSession.rol) {
      case '0':
        console.log("No rol 0 handle!");
        break;
      case '1':
        features.push(<LabelSectionDashboardFeature title='Extractos' key={titleKey + (features.length + 1)} />);
        features.push(<ItemDashboardFeature route='/dashboard' title='Extractos mensuales bancos' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)}  />);
        features.push(<ItemDashboardFeature route='/dashboard' title='Movimientos semanales bancos' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);
        break;
      default:
        console.log("No default handle!");
    }

    setStatementsSection(features);
  }

  function loadSuppliersFeatures(userSession, selectedProject) {
    const features = [];
    const titleKey = 'suppliers';

    switch (userSession.rol) {
      case '0':
        console.log("No rol 0 handle!");
        break;
      case '1':
        features.push(<LabelSectionDashboardFeature title='Proveedores' key={titleKey + (features.length + 1)} />);
        features.push(<ItemDashboardFeature route='/dashboard' title='Dashboard Proveedores' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)}  />);
        break;
      default:
        console.log("No default handle!");
    }

    setSuppliersSection(features);
  }

  function loadAftersalesFeatures(userSession, selectedProject) {
    const features = [];
    const titleKey = 'suppliers';

    switch (userSession.rol) {
      case '0':
        console.log("No rol 0 handle!");
        break;
      case '1':
        features.push(<LabelSectionDashboardFeature title='Postventa' key={titleKey + (features.length + 1)} />);
        features.push(<ItemDashboardFeature route='/dashboard' title='Dashboard Postventa' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)}  />);
        break;
      default:
        console.log("No default handle!");
    }

    setAftersalesSection(features);
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
          {servicesSection}
          {clientsSection}
          {statementsSection}
          {partnersSection}
          {suppliersSection}
          {aftersalesSection}
        </div>
      )}
    </div>
  );
}

export default DashboardFeature;
