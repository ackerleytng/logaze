import React from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { useData } from './data';


const renderLink = ({ value }) =>
  value === null ? value : <a target="_blank" rel="noopener noreferrer" href={value}>Buy</a>;

const renderBoolean = ({ value }) =>
      value === null ? '' : value ? 'Yes' : 'No';

const renderDecimal = (decimalPlaces) => ({ value }) =>
      value === null ? value : value.toFixed(decimalPlaces);

const App = () => {
  const data = useData();
  const columnDefs = [
    {headerName: 'Price (USD)', field: 'price', width: 130,
     cellRenderer: renderDecimal(2), filter: 'agNumberColumnFilter',
     sort: 'asc'},
    {headerName: 'Type', field: 'product-type', width: 70},
    {headerName: 'Model', field: 'model'},
    {headerName: 'Screen Size', field: 'screen-size', width: 70,
     cellRenderer: renderDecimal(1), filter: 'agNumberColumnFilter'},
    {headerName: 'Resolution', field: 'resolution', width: 100},
    {headerName: 'IPS Screen?', field: 'screen-has-ips', width: 70,
     cellRenderer: renderBoolean},
    {headerName: 'Display', field: 'display-type'},
    {headerName: 'Memory Size', field: 'memory-size', width: 70},
    {headerName: 'Hard Drive Type', field: 'hard-drive-type', width: 70},
    {headerName: 'Hard Drive Size', field: 'hard-drive-size', width: 70},
    {headerName: 'Processor Brand', field: 'processor-brand', width: 70},
    {headerName: 'Processor Range', field: 'processor-range', width: 80},
    {headerName: 'Processor', field: 'processor'},
    {headerName: 'Wireless', field: 'wireless'},
    {headerName: 'Graphics', field: 'graphics'},
    {headerName: 'Touchscreen?', field: 'screen-supports-touch', width: 70,
     cellRenderer: renderBoolean},
    {headerName: 'Buy!', field: 'url', width: 70,
     cellRendererFramework: renderLink},
    {headerName: 'Hard Drive', field: 'hard-drive'},
    {headerName: 'Memory', field: 'memory'},
    {headerName: 'Memory Soldered?', field: 'memory-soldered', width: 70,
     cellRenderer: renderBoolean},
    {headerName: 'Processor Cache', field: 'processor-cache', width: 70},
    {headerName: 'Battery', field: 'battery'},
    {headerName: 'Warranty', field: 'warranty'},
    {headerName: 'Operating System', field: 'operating-system'},
    {headerName: 'Original Price', field: 'orig-price', width: 70,
     cellRenderer: renderDecimal(2), filter: 'agNumberColumnFilter'},
    {headerName: 'Pointing Device', field: 'pointing-device'},
    {headerName: 'Part Number', field: 'part-number'},
    {headerName: 'Keyboard', field: 'keyboard'},
    {headerName: 'Bluetooth', field: 'bluetooth', width: 70},
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const gridOptions = {
    columnDefs,
    defaultColDef,
    suppressCellSelection: true,
    enableCellTextSelection: true,
  };

  const onFirstDataRendered = (params) => params.columnApi.autoSizeColumns();

  return (
    <div className="logaze-table">
      <div className="ag-theme-balham-dark logaze-table-wrapper">
        <AgGridReact
          gridOptions={gridOptions}
          rowData={data}
          multiSortKey={'ctrl'}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </div>
  );
}

export default App;
