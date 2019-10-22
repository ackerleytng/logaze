import React from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import {
  useData,
  loadFromJsonbin,
  dataToCsv,
  download
} from './data';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const renderLink = (value) => (
  <Button variant="light" size="sm" target="_blank" rel="noopener noreferrer" href={value}>
    Buy
  </Button>
);

const renderBoolean = (value) => value ? 'Yes' : 'No';

const renderDecimal = (decimalPlaces) => (value) =>
      value === null ? value : value.toFixed(decimalPlaces);

const nullCheck = (fn) => ({ value }) => value === null ? value : fn(value);

const prefixDollarSign = (fn) => (s) => `$${fn(s)}`;

const downloadCsv = () => loadFromJsonbin().then(data => download('logaze.csv', dataToCsv(data)));

const App = () => {
  const data = useData();
  const columnDefs = [
    {headerName: 'USD', field: 'url', width: 65,
     cellRendererFramework: nullCheck(renderLink)},
    {headerName: 'Price', field: 'price', width: 70,
     cellRenderer: nullCheck(prefixDollarSign(renderDecimal(2))),
     filter: 'agNumberColumnFilter', sort: 'asc'},
    {headerName: 'Type', field: 'product-type', width: 70},
    {headerName: 'Model', field: 'model'},
    {headerName: 'Screen Size', field: 'screen-size', width: 70,
     cellRenderer: nullCheck(renderDecimal(1)), filter: 'agNumberColumnFilter'},
    {headerName: 'Resolution', field: 'resolution', width: 100},
    {headerName: 'IPS Screen?', field: 'screen-has-ips', width: 70,
     cellRenderer: nullCheck(renderBoolean)},
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
     cellRenderer: nullCheck(renderBoolean)},
    {headerName: 'Hard Drive', field: 'hard-drive'},
    {headerName: 'Memory', field: 'memory'},
    {headerName: 'Memory Soldered?', field: 'memory-soldered', width: 70,
     cellRenderer: nullCheck(renderBoolean)},
    {headerName: 'Processor Cache', field: 'processor-cache', width: 70},
    {headerName: 'Battery', field: 'battery'},
    {headerName: 'Warranty', field: 'warranty'},
    {headerName: 'Operating System', field: 'operating-system'},
    {headerName: 'Original Price', field: 'orig-price', width: 70,
     cellRenderer: nullCheck(prefixDollarSign(renderDecimal(2))),
     filter: 'agNumberColumnFilter'},
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
    suppressHorizontalScroll: true,
    rowHeight: 40,
    headerHeight: 40,
  };

  const onFirstDataRendered = (params) => params.columnApi.autoSizeColumns();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          logaze
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">faq</Nav.Link>
          <Nav.Link href="#link">rescrape</Nav.Link>
          <Nav.Link onClick={downloadCsv}>csv</Nav.Link>
        </Nav>
      </Navbar>
      <div className="ag-theme-balham-dark table-wrapper">
        <AgGridReact
          gridOptions={gridOptions}
          rowData={data}
          multiSortKey={'ctrl'}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </>
  );
}

export default App;
