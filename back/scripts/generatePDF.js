const PDFDocument = require('pdfkit');

const generatePDF = (instruction, response) => {
  const doc = new PDFDocument;
  doc.pipe(response);
  doc.font('Times-Roman')
    .fontSize(26)
    .text(instruction.name, {align: 'center'});
  doc.moveDown();
  doc.font('Times-Roman')
    .fontSize(20)
    .text(`Author: ${instruction.author}`);
  doc.font('Times-Roman')
    .fontSize(12)
    .text(`Theme: ${instruction.theme}`);
  doc.font('Times-Roman')
    .fontSize(12)
    .text(`Score: ${instruction.score}`);
  doc.moveDown();
  instruction.steps.forEach((step, index) => {
    doc.font('Times-Roman')
      .fontSize(12)
      .text(`Step ${index + 1}: ${step.stepTitle}`);
    doc.font('Times-Roman')
      .fontSize(10)
      .text(step.descriptionTitle);
    doc.moveDown();
  });
  return doc;
};

module.exports = generatePDF;
