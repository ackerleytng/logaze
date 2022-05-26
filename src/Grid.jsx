import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';


const Buy = (value) => (
  <a target="_blank" rel="noopener noreferrer" href={value}>
    Buy
  </a>
);

const renderDecimal = (decimalPlaces) => (value) => value.toFixed(decimalPlaces);

const nullCheck = (fn) => ({ value }) => value === null ? value : fn(value);

const price = (value) => `$${value}`;

const Grid = ({ data }) => {
  const columnDefs = [
    {headerName: '', field: 'url', width: 44, cellRenderer: nullCheck(Buy)},
    {headerName: 'Price', field: 'price', width: 75,
     cellRenderer: nullCheck(price),
     filter: 'agNumberColumnFilter', sort: 'asc'},
    {headerName: 'Condition', field: 'product-condition', width: 70},
    {headerName: 'Model', field: 'model'},
    {headerName: 'Screen Size', field: 'screen-size', width: 70,
     cellRenderer: nullCheck(renderDecimal(1)),
     filter: 'agNumberColumnFilter'},
    {headerName: 'Resolution', field: 'resolution', width: 100},
    {headerName: 'IPS Screen?', field: 'screen-has-ips', width: 70},
    {headerName: 'Display', field: 'display'},
    {headerName: 'Memory Size', field: 'memory-size', width: 70},
    {headerName: 'Storage Type', field: 'storage-type', width: 70},
    {headerName: 'Storage Size', field: 'storage-size', width: 70},
    {headerName: 'Processor Brand', field: 'processor-brand', width: 70},
    {headerName: 'Processor Range', field: 'processor-range', width: 80},
    {headerName: 'Processor', field: 'processor'},
    {headerName: 'Wireless', field: 'wlan'},
    {headerName: 'Graphics', field: 'graphics'},
    {headerName: 'Camera', field: 'camera'},
    {headerName: 'Touchscreen?', field: 'touch-screen', width: 70},
    {headerName: 'Storage', field: 'storage'},
    {headerName: 'Memory', field: 'memory'},
    {headerName: 'Memory Soldered?', field: 'memory-soldered', width: 70},
    {headerName: 'Processor Cache', field: 'processor-cache', width: 70},
    {headerName: 'Battery', field: 'battery'},
    {headerName: 'Warranty', field: 'warranty'},
    {headerName: 'Weight', field: 'weight'},
    {headerName: 'Operating System', field: 'operating-system'},
    {headerName: 'Original Price', field: 'orig-price',
     cellRenderer: nullCheck(price),
     width: 75, filter: 'agNumberColumnFilter'},
    {headerName: 'Fingerprint Reader', field: 'fingerprint-reader'},
    {headerName: 'Product Number', field: 'product-number'},
    {headerName: 'Keyboard', field: 'keyboard'},
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const gridOptions = {
    columnDefs,
    defaultColDef,
    suppressCellFocus: true,
    enableCellTextSelection: true,
  };

  const onFirstDataRendered = (params) => params.columnApi.autoSizeColumns();

  return (
    <div className="ag-theme-balham-dark table-wrapper">
      <AgGridReact
        gridOptions={gridOptions}
        rowData={data}
        multiSortKey={'ctrl'}
        onFirstDataRendered={onFirstDataRendered}
      />
    </div>
  );
}

export default Grid;
