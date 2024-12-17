import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Phone } from '../types/phone';

export const generatePhonePDF = (phones: Phone[], filtered: boolean = false) => {
  const doc = new jsPDF();
  const title = filtered ? 'Filtered Phones Dataset' : 'Complete Phones Dataset';
  
  // Add title
  doc.setFontSize(20);
  doc.text(title, 14, 15);
  doc.setFontSize(12);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 25);

  // Prepare data for table
  const tableData = phones.map(phone => [
    phone.name,
    phone.company,
    `₹${phone.price.toLocaleString()}`,
    `${phone.specs.cameraMP}MP`,
    `${phone.specs.storageGB}GB`,
    `${phone.specs.ram}GB`,
    `${phone.specs.processorGHz}GHz`,
    `${phone.specs.batteryMAh}mAh`
  ]);

  // Add table
  autoTable(doc, {
    head: [['Name', 'Company', 'Price', 'Camera', 'Storage', 'RAM', 'Processor', 'Battery']],
    body: tableData,
    startY: 35,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [102, 16, 242],
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
  });

  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = filtered ? 'filtered-phones-data.pdf' : 'complete-phones-data.pdf';
  doc.save(fileName);
};