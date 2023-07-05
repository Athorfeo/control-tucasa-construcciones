import { jsPDF } from "jspdf";
import logo from "resource/images/logo.jpeg";

function headersOrderPurchase() {
  const headers = [];
  headers.push({
    id: "product_name",
    name: "product_name",
    prompt: "Nombre del producto",
    width: 105,
    align: "left",
    padding: 0
  });

  headers.push({
    id: "quantity",
    name: "quantity",
    prompt: "Cantidad",
    width: 40,
    align: "center",
    padding: 0
  });

  headers.push({
    id: "chapter",
    name: "chapter",
    prompt: "Capitulo",
    width: 105,
    align: "left",
    padding: 0
  });

  return headers;
}

export async function downloadPDFOrderPurchase(data) {
  const pdf = new jsPDF();

  pdf.setDrawColor(255, 0, 0);
  pdf.setLineWidth(3);
  pdf.line(0, 0, 220, 0);

  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.1);

  pdf.setFontSize(40);
  pdf.setTextColor(255, 0, 0);
  pdf.text("Orden de compra", 10, 25);
  pdf.addImage(logo, "JPEG", 160, 5, 40, 30);

  pdf.setFontSize(12);

  pdf.setTextColor(0, 0, 0);
  pdf.setFont("helvetica", "bold");
  pdf.text("Fecha de envio", 10, 50);
  pdf.text("Orden de compra", 160, 50);
  pdf.text("Observaciones", 10, 70);

  pdf.line(10, 85, 200, 85);

  pdf.text("Proveedor", 10, 95);

  pdf.line(10, 110, 200, 110);

  pdf.setFont("helvetica", "normal");
  pdf.text(data[0][1], 10, 55); //Fecha
  pdf.text(data[0][0], 160, 55); //id
  pdf.text(data[0][2], 10, 75); //Observacion
  pdf.text(data[0][3], 10, 100); // Proveedor

  const items = data.map((item, index) => {
    return {
      product_name: item[4],
      quantity: item[5],
      chapter: item[6],
    }
  });

  pdf.table(10, 120, items, headersOrderPurchase(), { autoSize: false });

  pdf.save(data[0][0] +"-orden-de-compra.pdf");
}