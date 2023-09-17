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
    features.push(<LabelSectionDashboardFeature title='Reportes' key={titleKey +  1} />);

    const minuteURL = selectedProject.reports.minute;
    const minuteRoute = <ItemDashboardFeatureHttp url={minuteURL} title='Ejecución Obra' description='Reporte de lectura sobre ejecucion y avance de obra' isEnable={true} key={titleKey + 2} />;

    const accountantURL = selectedProject.reports.accountant;
    const accountantRoute = (<ItemDashboardFeatureHttp url={accountantURL} title='Contable' description='Reporte de lectura de facturas y pagos a proveedores o contratistas' isEnable={true} key={titleKey +  3} />);
 
    const patnersURL = selectedProject.reports.patners;
    const patnersRoute = (<ItemDashboardFeatureHttp url={patnersURL} title='Socios' description='Reporte de lectura de presupuesto y gastos por capitulos' isEnable={true} key={titleKey + 4} />);


    if (isSuperAdminRol(rol) || isAdminRol(rol)) {
      features.push(minuteRoute);
      features.push(accountantRoute);
      features.push(patnersRoute);
    }

    if (isDefaultRol(rol)) {
      features.push(minuteRoute);
    }

    if (isAccountantRol(rol)) {
      features.push(accountantRoute);
    }

    setReportsSection(features);
  }

  function loadPurchaseFeatures(rol, selectedProject) {
    const features = [];

    const titleKey = 'purchases';
    features.push(<LabelSectionDashboardFeature title='Compras y pagos' key={titleKey + 0} />);

    const pettyCashRoute = "/purchase/pettycash/" + selectedProject.purchase.pettyCash;
    const pettyCashFeature = <ItemDashboardFeature route={pettyCashRoute} title='Caja menor' description='Modulo de facturas de caja menor' isEnable={true} key={titleKey + 1} />;

    const invoiceRoute = "/purchase/invoice/" + selectedProject.purchase.invoice;
    const invoiceFeature = <ItemDashboardFeature route={invoiceRoute} title='Facturas y pagos' description='Modulo de facturas y pagos a proveedores o contratistas' isEnable={true} key={titleKey + 2} />;
    
    const taxesFeature = <ItemDashboardFeature route='/dashboard' title='Impuestos' description='Esta es una descripcion' isEnable={false} key={titleKey + 3} />;

    const orderRoute = "/purchase/order/" + selectedProject.purchase.order;
    const orderFeature = <ItemDashboardFeature route={orderRoute} title='Orden de compra' description='Modulo de generacion de facturas de orden de compra' key={titleKey + 4} isEnable={true} />;


    if (isSuperAdminRol(rol) || isAdminRol(rol)) {
      features.push(pettyCashFeature);
      features.push(invoiceFeature);
      features.push(taxesFeature);
      features.push(orderFeature);
    }

    if (isAssistantRol(rol)) {
      features.push(pettyCashFeature);
      features.push(invoiceFeature);
    }

    if (isAccountantRol(rol)) {
      features.push(pettyCashFeature);
      features.push(invoiceFeature);    }

    if (isDefaultRol(rol)) {
      features.push(orderFeature);
    }

    setPuchasesSection(features);
  }

  function loadServicesFeatures(rol, selectedProject) {
    const features = [];

    const titleKey = 'services';
    const labelFeature = (<LabelSectionDashboardFeature title='Servicios' key={titleKey + 1} />);

    const minuteServiceRoute = "/service/minute/" + selectedProject.service.minute;
    const minuteFeature = (<ItemDashboardFeature route={minuteServiceRoute} title='Actas de avance de obra' description='Modulo de actas de avance de obra' isEnable={true} key={titleKey + 2} />);

    if (isDefaultRol(rol)) {
      features.push(labelFeature);
      features.push(minuteFeature);
    }

    if (isSuperAdminRol(rol) || isAdminRol(rol)) {
      features.push(labelFeature);
      features.push(minuteFeature);
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
