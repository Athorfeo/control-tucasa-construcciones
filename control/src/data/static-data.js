export const staticData = {
  chapters: [
    {id: 1, name: "PRELIMINARES"},
    {id: 2, name: "EXCAVACIONES"},
    {id: 3, name: "CIMENTACIÒN"},
    {id: 4, name: "ESTRUCTURA"},
    {id: 5, name: "MAMPOSTERIA"},
    {id: 6, name: "CUBIERTA"},
    {id: 7, name: "INSTALACIONES HIDROSANITARIAS"},
    {id: 8, name: "INSTALACIONES ELECTRICAS"},
    {id: 9, name: "INSTALACIONES GAS NATURAL"},
    {id: 10, name: "PAÑETES"},
    {id: 11, name: "ENCHAPE DE PISOS Y MUROS"},
    {id: 12, name: "MESONES Y APARATOS SANITARIOS"},
    {id: 13, name: "GRIFERIA Y ESPEJOS"},
    {id: 14, name: "DRYWALL Y PVC"},
    {id: 15, name: "ESTUCO Y PINTURA"},
    {id: 16, name: "CARPINTERIA DE MADERA"},
    {id: 17, name: "CARPINTERIA EN ALUMINIO"},
    {id: 18, name: "CARPINTERIA METALICA"},
    {id: 19, name: "OBRAS EXTERIORES"},
    {id: 20, name: "TERRENO, LICENCIA Y TRAMITES NOTARIALES"},
    {id: 21, name: "ADMINISTRATIVOS"},
    {id: 22, name: "POSTVENTA"}
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
  },
  typeInvoice: {
    suppliers: {id: 1, name: "Proveedor"},
    contractors: {id: 2, name: "Contratista"}
  },
};

export const getTypeInvoices = [
  staticData.typeInvoice.suppliers,
  staticData.typeInvoice.contractors,
];