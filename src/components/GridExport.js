import './GridExport.css';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { Button } from '@progress/kendo-react-buttons'
import { Checkbox } from '@progress/kendo-react-inputs';
import { gridSampleProducts } from './grid-sample-products.jsx';
import { process } from '@progress/kendo-data-query';

function GridExport() {
  /*
    This demo only uses paging, which means we just need to deal with:
     skip (determines the start of a page)
     take (determines the page size)
    Using @progress/kendo-data-query we can then take our array of JSON data (gridSampleProducs)
    to format the data to make it easier to bind to the Grid. With paging this is a quick shorcut,
    but with filtering, sorting, and grouping (not enabled here) it will become very helpful.
  */
  const [data, setData] = useState();
  const [take, setTake] = useState(5);
  const [skip, setSkip] = useState(0);
  const [allPageCheck, setAllPageCheck] = useState(false);
  const [isPdfExporting, setIsPdfExporting] = useState(false);
  const pdfExportRef = useRef(null);

  const dataState = {
    take,
    skip
  }

  // Take our JSON data and transform it to a format that easily binds to the Grid, using our skip and take variables
  const processedData = process(gridSampleProducts, dataState);

  useEffect(
    () => {
      if(!processedData.data.length) {
        setSkip(0);
      }
      setData(gridSampleProducts);
    },
    [processedData, data]
  );

  const allPageChange = (event) => {
    setAllPageCheck(!allPageCheck);
  };

  const onPdfExportDone = useCallback(
    () => {
      setIsPdfExporting(false);
    },
    []
  );

  const onPdfExport = useCallback(
    () => {
      if(pdfExportRef.current) {
        setIsPdfExporting(true);
        if(allPageCheck) {
          pdfExportRef.current.save(data, onPdfExportDone);
        }
        else {
          pdfExportRef.current.save(processedData.data, onPdfExportDone);
        }        
      }
    },
    [processedData, onPdfExportDone]
  );

  /* This triggers whenever data changes in the Grid (sorting, paging, filtering, grouping)
     We just use sorting in this case, but when we have more operations this will be our go-to event
  */
  const onDataStateChange = useCallback(
    (event) => {
      setTake(event.dataState.take);
      setSkip(event.dataState.skip);
    },
    [setTake, setSkip]
  );

  const GridElement = (
    <Grid
      data={processedData}
      rowHeight={40}
      pageable
      {...dataState}
      onDataStateChange={onDataStateChange}
    >
      <GridToolbar>
        <Button
          icon="pdf"
          onClick={onPdfExport}
          disabled={isPdfExporting}
        >
        </Button>
      </GridToolbar>
      <Column field="ProductID" title="ID" />
      <Column field="ProductName" title="Name" />
      <Column field="Category.CategoryName" title="Category" />
      <Column field="UnitPrice" title="Price" />
      <Column field="UnitsInStock" title="In Stock" />
      <Column field="Discontinued" title="Discontinued" />
    </Grid>
  );

  return (
    <>
      <div className="grid-export-area">
        <h1>Grid Export</h1>
        <Checkbox
          onChange={allPageChange}
          checked={allPageCheck}
          label={'Export All Pages'}
        />
      </div>
      {GridElement}
      <GridPDFExport ref={pdfExportRef}>
        {GridElement}
      </GridPDFExport>
    </>
  );
}

export default GridExport;