import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Loading from "../components/loading";
import Navigator from "../components/navigator";
import { isSessionReady, isDefaultRol, isAdminRol, isSuperAdminRol, isAssistantRol, isAccountantRol } from "util/session-util";
import ItemDashboardFeature from "./item-dashboard-feature";
import ItemDashboardFeatureHttp from "./item-dashboard-feature-http";
import LabelSectionDashboardFeature from "./label-section-dashboard-feature";
import { storageConfig, getJsonItem } from "util/storage-util";

function DashboardFeature() {
  const [isLoading, setIsLoading] = useState(false);

  const [reportsSection, setReportsSection] = useState([]);
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
        const rol = parseInt(userSession.rol);
        const selectedProject = getJsonItem(storageConfig.selectedProjectDataKey);

        loadReports(rol, selectedProject);
        loadPurchaseFeatures(rol, selectedProject);
        loadServicesFeatures(rol, selectedProject);
        loadClientsFeatures(rol, selectedProject);
        loadPatnersFeatures(rol, selectedProject);
        loadStatementsFeatures(rol, selectedProject);
        loadSuppliersFeatures(rol, selectedProject);
        loadAftersalesFeatures(rol, selectedProject);
      }
      setIsLoading(false);
    };

    task();
  }, []);

  function loadReports(rol, selectedProject) {
    const features = [];

    const titleKey = 'reports';
    features.push(<LabelSectionDashboardFeature title='Reportes' key={titleKey + (features.length + 1)} />);

    if (isDefaultRol(rol) || isSuperAdminRol(rol) || isAdminRol(rol)) {
      const minuteURL = selectedProject.reports.minute;
      features.push(<ItemDashboardFeatureHttp url={minuteURL} title='Ejecución Obra' description='Esta es una descripcion' isEnable={true} key={titleKey + (features.length + 1)} />);
    }

    if (isAccountantRol(rol) || isSuperAdminRol(rol) || isAdminRol(rol)) {
      const accountantURL = selectedProject.reports.accountant;
      features.push(<ItemDashboardFeatureHttp url={accountantURL} title='Contable' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);
    }

    if (isSuperAdminRol(rol) || isAdminRol(rol)) {
      const patnersURL = selectedProject.reports.patners;
      features.push(<ItemDashboardFeatureHttp url={patnersURL} title='Socios' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);
    }

    setReportsSection(features);
  }

  function loadPurchaseFeatures(rol, selectedProject) {
    const features = [];

    const titleKey = 'purchases';
    features.push(<LabelSectionDashboardFeature title='Compras y pagos' key={titleKey + (features.length + 1)} />);

    if (isSuperAdminRol(rol) || isAdminRol(rol)) {
      features.push(<ItemDashboardFeature route='/dashboard' title='Caja menor' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);

      const invoiceRoute = "/purchase/invoice/" + selectedProject.purchase.invoice;
      features.push(<ItemDashboardFeature route={invoiceRoute} title='Facturas y pagos' description='Esta es una descripcion' isEnable={true} key={titleKey + (features.length + 1)} />);

      features.push(<ItemDashboardFeature route='/dashboard' title='Impuestos' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);

      const purchaseOrderRoute = "/purchase/order/" + selectedProject.purchase.order;
      features.push(<ItemDashboardFeature route={purchaseOrderRoute} title='Orden de compra' description='Esta es una descripcion' key={titleKey + (features.length + 1)} isEnable={true} />);
    }

    if (isAssistantRol(rol) || isAccountantRol(rol)) {
      const invoiceRoute = "/purchase/invoice/" + selectedProject.purchase.invoice;
      features.push(<ItemDashboardFeature route={invoiceRoute} title='Facturas y pagos' description='Esta es una descripcion' isEnable={true} key={titleKey + (features.length + 1)} />);
    }

    if (isDefaultRol(rol)) {
      const purchaseOrderRoute = "/purchase/order/" + selectedProject.purchase.order;
      features.push(<ItemDashboardFeature route={purchaseOrderRoute} title='Orden de compra' description='Esta es una descripcion' key={titleKey + (features.length + 1)} isEnable={true} />);
    }

    setPuchasesSection(features);
  }

  function loadServicesFeatures(rol, selectedProject) {
    const features = [];

    if (isDefaultRol(rol)) {
      const titleKey = 'services';
      features.push(<LabelSectionDashboardFeature title='Servicios' key={titleKey + (features.length + 1)} />);

      const minuteServiceRoute = "/service/minute/" + selectedProject.service.minute;
      features.push(<ItemDashboardFeature route={minuteServiceRoute} title='Actas de avance de obra' description='Esta es una descripcion' isEnable={true} key={titleKey + (features.length + 1)} />);
    }

    if (isSuperAdminRol(rol) || isAdminRol(rol)) {
      const titleKey = 'services';
      features.push(<LabelSectionDashboardFeature title='Servicios' key={titleKey + (features.length + 1)} />);

      const minuteServiceRoute = "/service/minute/" + selectedProject.service.minute;
      features.push(<ItemDashboardFeature route={minuteServiceRoute} title='Actas de avance de obra' description='Esta es una descripcion' isEnable={true} key={titleKey + (features.length + 1)} />);
    }

    setServicesSection(features);
  }

  function loadClientsFeatures(rol, selectedProject) {
    if (isSuperAdminRol(rol) || isAdminRol(rol)) {
      const features = [];

      const titleKey = 'clients';
      features.push(<LabelSectionDashboardFeature title='Clientes' key={titleKey + (features.length + 1)} />);

      features.push(<ItemDashboardFeature route='/dashboard' title='Abonos' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);
      features.push(<ItemDashboardFeature route='/dashboard' title='Clientes' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);

      setClientsSection(features);
    }
  }

  function loadPatnersFeatures(rol, selectedProject) {
    if (isSuperAdminRol(rol) || isAdminRol(rol)) {
      const features = [];

      const titleKey = 'patners';
      features.push(<LabelSectionDashboardFeature title='Socios' key={titleKey + (features.length + 1)} />);

      features.push(<ItemDashboardFeature route='/dashboard' title='Aportes' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);
      features.push(<ItemDashboardFeature route='/dashboard' title='Socios' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);
      features.push(<ItemDashboardFeature route='/dashboard' title='Prestamos' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);

      setPartnersSection(features);
    }
  }

  function loadStatementsFeatures(rol, selectedProject) {
    if (isSuperAdminRol(rol) || isAdminRol(rol)) {
      const features = [];

      const titleKey = 'statements';
      features.push(<LabelSectionDashboardFeature title='Extractos' key={titleKey + (features.length + 1)} />);

      features.push(<ItemDashboardFeature route='/dashboard' title='Extractos mensuales bancos' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);
      features.push(<ItemDashboardFeature route='/dashboard' title='Movimientos semanales bancos' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);

      setStatementsSection(features);
    }
  }

  function loadSuppliersFeatures(rol, selectedProject) {
    if (isSuperAdminRol(rol) || isAdminRol(rol)) {
      const features = [];

      const titleKey = 'suppliers';
      features.push(<LabelSectionDashboardFeature title='Proveedores' key={titleKey + (features.length + 1)} />);

      features.push(<ItemDashboardFeature route='/dashboard' title='Dashboard Proveedores' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);

      setSuppliersSection(features);
    }
  }

  function loadAftersalesFeatures(rol, selectedProject) {
    if (isSuperAdminRol(rol) || isAdminRol(rol)) {
      const features = [];

      const titleKey = 'suppliers';
      features.push(<LabelSectionDashboardFeature title='Postventa' key={titleKey + (features.length + 1)} />);

      features.push(<ItemDashboardFeature route='/dashboard' title='Dashboard Postventa' description='Esta es una descripcion' isEnable={false} key={titleKey + (features.length + 1)} />);

      setAftersalesSection(features);
    }
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

          {reportsSection}
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
