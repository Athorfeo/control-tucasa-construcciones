export const staticData = {
  chapters: [
    {id: 1, name: "PRELIMINARES", activities:["Limpieza del terreno", "Cerramiento en lona verde", "Campamento de obra", "Pozo séptico", "Instalación de sanitario provisional de obra", "Organizacion de materiales"]},
    {id: 2, name: "EXCAVACIONES", activities:["Excavación manual de zapatas / ciclópeo","Excavación manual de vigas"]},
    {id: 3, name: "CIMENTACIÒN",  activities:["Concreto ciclópeo", "Zapatas - Fundición y armado de la parrilla", "Pedestales -  Fundición y armado del hierro", "Viga de amarre muro de contención - Fundición y armado del hierro", "Muro de contención en ladrillo", "Relleno por carretillas", "Compactación manual del terreno", "Vigas de cimentación - Fundición y armado del hierro"]},
    {id: 4, name: "ESTRUCTURA",  activities:["Columnas Primer piso", "Columnetas Primer piso", "Placa para segundo piso", "Columnas Segundo piso", "Columnetas Segundo piso", "Viga corona", "Escaleras (fundición y armado del hierro)", "Placa de tanque y viga canal con bordillos", "Dintel para ventanas, puerta principal y porton"]},
    {id: 5, name: "MAMPOSTERIA",  activities:["Muros en bloque - Primer piso", "Muros en bloque - Segundo piso", "Muros de cubiertas", "Muros en ladrillo macizo", "Muro fundido en concreto a la vista", "Tela asfaltica para muros", "Bordillo de balcones", "Demoliciones"]},
    {id: 6, name: "CUBIERTA", activities:["Instalación de cubierta en estructura metálica y lámina master 1000", "Impermeabilizacion de placa de tanque y viga canal", "Impermeabilización muros de cubiertas", "Instalación de zinc liso en los bordes"]},
    {id: 7, name: "INSTALACIONES HIDROSANITARIAS", activities:["Red hidráulica y sanitaria", "Red de agua caliente para duchas", "Apertura de zanjas para acometida de alcantarillado", "Instalacion de 'sillas Y'", "Apertura de zanjas para acometida de acueducto", "Instalación de tanque aéreo de agua potable", "Instalación de tapas de llave de paso", "Instalacion llaves de lavaplatos y canastilla", "Instalación de lavadero con grifería", "Fabricación de caja de inspección", "Instalación de acometida exterior de agua potable", "Instalación de acometida exterior de aguas negras"]},
    {id: 8, name: "INSTALACIONES ELECTRICAS", activities:[]},
    {id: 9, name: "INSTALACIONES GAS NATURAL", activities:[]},
    {id: 10, name: "PAÑETES", activities:["Pañete muros - Primer piso", "Pañete muros - Segundo piso", "Pañete bajo voladizo", "Pañete bajo escaleras", "Pañete en vacio de escaleras", "Dilataciones Segundo piso", "Aberturas para ventanas y tragaluces incluidos los filetes", "Poyos de closet y cocinas", "Antepisos", "Pañete de fachada", "Impermeabilización con impercril y cal de muro", "Fundición columna falsa"]},
    {id: 11, name: "ENCHAPE DE PISOS Y MUROS", activities:["Enchape de pisos en cerámica", "Enchape de escaleras", "Granito de escaleras", "Guardaescoba de 5cm de alto", "Mosaico para cambio de ceramica en baños y cocinas", "Enchape pared de cocina", "Enchape pared de lavadero", "Enchape de muros exteriores", "Guardaescoba de fachada de 20 cm de alto"]},
    {id: 12, name: "MESONES Y APARATOS SANITARIOS", activities:["Baños con ducha (incluye enchape de ducha, instalación de aparatos, accesorios y griferias)", "Baños sociales (incluye instalación de aparatos, accesorios y griferia)"]},
    {id: 13, name: "GRIFERIA Y ESPEJOS", activities:[]},
    {id: 14, name: "DRYWALL Y PVC", activities:["PVC para baños"]},
    {id: 15, name: "ESTUCO Y PINTURA", activities:["Estuco de barro sobre muros interiores", "Pintura de muros interiores", "Estuco plástico y pintura de fachadas", "Estuco plástico para baños", "Estuco y pintura bajo escaleras", "Estuco y pintura en vacio de escaleras", "Dilataciones Segundo piso", "Resanes y retoque de pintura"]},
    {id: 16, name: "CARPINTERIA DE MADERA", activities:[]},
    {id: 17, name: "CARPINTERIA EN ALUMINIO", activities:[]},
    {id: 18, name: "CARPINTERIA METALICA", activities:["Instalación de puertas y marcos en madera", "Instalación muebles de cocina", "Instalacion de muebles de baño", "Instalación puertas principales", "Pintura de puertas", "Instalación portones", "Pintura de portones", "Instalacion de rejas de seguridad"]},
    {id: 19, name: "OBRAS EXTERIORES", activities:["Pavimento de vía (incluye replanteo)", "Anden (incluye bordillo, rampa, escalones y piso de anden)", "Relleno por carretillas", "Adecuación de jardín", "Cuneta (Incluye Bordillo)",]},
    {id: 20, name: "TERRENO, LICENCIA Y TRAMITES NOTARIALES", activities:[]},
    {id: 21, name: "ADMINISTRATIVOS", activities:[]},
    {id: 22, name: "POSTVENTA", activities:["Corrección de goteras", "Resane de fisuras", "Arreglo de tuberias", "Correccion de humedades en muros", "Arreglo drywall", "Otro - especificar"]}
  ],
  units: [
    {id: 1, name: "m", detail: "Metro"},
    {id: 2, name: 'm2', detail: "Metro cuadrado"},
    {id: 3, name: 'm3', detail: "Metro cubico"},
    {id: 4, name: "u", detail: "Unidad"},
    {id: 5, name: "Global", detail: "Global"},
  ],
  uiActions: {
    add: "add",
    update: "update",
    approve: "approve",
    detail: "detail",
    accountingSupport: "accountingsupport",
  },
  typeInvoice: {
    suppliers: {id: 1, name: "Proveedor"},
    contractors: {id: 2, name: "Contratista"}
  },
  paymentType: {
    transferenciaBancolombia: {id: 1, name: "TRANSFERENCIA (BANCOLOMBIA)"},
    transferenciaDavivienda: {id: 2, name: "TRANSFERENCIA (DAVIVIENDA)"},
    efectivo: {id: 3, name: "EFECTIVO"},
    tarjetaBancolombia: {id: 4, name: "TARJETA (BANCOLOMBIA)"},
    tarjetaDavivienda: {id: 5, name: "TARJETA (DAVIVIENDA)"},
    consignacion: {id: 6, name: "CONSIGNACION"},
    cheque: {id: 7, name: "CHEQUE"},
    pendiente: {id: 8, name: "PENDIENTE"},
    pseBancolombia: {id: 9, name: "PSE (BANCOLOMBIA)"},
    pseDavivienda: {id: 10, name: "PSE (DAVIVIENDA)"},
    efectivoE: {id: 11, name: "EFECTIVO (E)"},
  },
  banks: {
    davivienda: {id: 1, name: "DAVIVIENDA"},
    bancolombia: {id: 2, name: "BANCOLOMBIA"},
    crediservir: {id: 3, name: "CREDISERVIR"},
    daviplata: {id: 4, name: "DAVIPLATA"},
    nequi: {id: 5, name: "NEQUI"},
    bogota: {id: 6, name: "BANCO DE BOGOTA"},
    cajasocial: {id: 7, name: "BANCO CAJA SOCIAL"},
    bbva: {id: 8, name: "BBVA"},
    agragrio: {id: 9, name: "BANCO AGRARIO"},
    w: {id: 10, name: "BANCO W"},
    mujer: {id: 11, name: "BANCO DE LA MUJER"},
    efecty: {id: 12, name: "EFECTY"},
    afectivo: {id: 13, name: "EFECTIVO"},
  },
  documentType: {
    cedula: {id: 1, name: "CEDULA"},
    nit: {id: 2, name: "NIT"},
  },
  accountType: {
    savings: {id: 1, name: "AHORROS"},
    current: {id: 2, name: "CORRIENTE"},
  }
};

export const getTypeInvoices = [
  staticData.typeInvoice.suppliers,
  staticData.typeInvoice.contractors,
];

export const getPaymentType = [
  staticData.paymentType.transferenciaBancolombia,
  staticData.paymentType.transferenciaDavivienda,
  staticData.paymentType.efectivo,
  staticData.paymentType.tarjetaBancolombia,
  staticData.paymentType.tarjetaDavivienda,
  staticData.paymentType.consignacion,
  staticData.paymentType.cheque,
  staticData.paymentType.pendiente,
  staticData.paymentType.pseBancolombia,
  staticData.paymentType.pseDavivienda,
  staticData.paymentType.efectivoE,
];

export const getBanks = [
  staticData.banks.davivienda,
  staticData.banks.bancolombia,
  staticData.banks.crediservir,
  staticData.banks.nequi,
  staticData.banks.bogota,
  staticData.banks.cajasocial,
  staticData.banks.bbva,
  staticData.banks.agragrio,
  staticData.banks.w,
  staticData.banks.mujer,
  staticData.banks.efecty,
  staticData.banks.afectivo,
];

export const documentTypesData = [
  staticData.documentType.cedula,
  staticData.documentType.nit,
];

export const accountTypesData = [
  staticData.accountType.savings,
  staticData.accountType.current,
];