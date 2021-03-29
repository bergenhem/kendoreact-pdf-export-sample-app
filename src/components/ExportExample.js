import './ExportExample.css';
import kendoka from './react-kendoka.png';
import { Button } from '@progress/kendo-react-buttons';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { useRef } from 'react';

function ExportExample () {
  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);
  
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

  const handleExportWithFunction = (event) => {
    savePDF(contentArea.current, { paperSize: "A4" });
  }

  return (
    <div className="app-content">
      <PDFExport ref={pdfExportComponent} paperSize="A4">
        <div ref={contentArea}>
          <h1>KendoReact PDF Processing</h1>
          <img src={kendoka} alt="Kendo UI Kendoka" />
          <p>This is an example of text that may be <span className="neat-style">styled</span></p>
          <div className="button-area">
            <Button primary={true} onClick={handleExportWithComponent}>Export with Component</Button>
            <Button onClick={handleExportWithFunction}>Export with Method</Button>
          </div>
        </div>
      </PDFExport>
    </div>
  );
}

export default ExportExample;
