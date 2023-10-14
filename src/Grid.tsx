import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridEvent, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { retrieveSettings, saveSettings, clearSettings } from "./gridSettings";
import { LaptopData } from "./data";

interface BuyProps {
  value: string,
};

const Buy = ({ value }: BuyProps) => (
  <a target="_blank" rel="noopener noreferrer" href={value}>
    Buy
  </a>
);

const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
};

const retrieveAndApplySettings = (event: AgGridEvent) => {
  const settings = retrieveSettings();
  if (!settings) {
    return;
  }

  const { filterModel, columnState } = settings;

  if (!filterModel) {
    console.error('filterModel is missing!');
    clearSettings();
    return;
  }

  if (!columnState) {
    console.error('columnState is missing!');
    clearSettings();
    return;
  }

  event.api.setFilterModel(filterModel);

  if (!event.columnApi.applyColumnState({ state: columnState })) {
    console.error('Error applying column state!');
    clearSettings();
  }
};

const onFirstDataRendered = (event: AgGridEvent) => {
  retrieveAndApplySettings(event);

  event.columnApi.autoSizeAllColumns(true);
};

const onSortOrFilterChange = ({ api, columnApi }: AgGridEvent) => {
  const columnState = columnApi.getColumnState();
  const filterModel = api.getFilterModel();

  saveSettings(columnState, filterModel);
};

const memComparator = (aStr: string | null, bStr: string | null) => {
  const cleanString = (str: string | null) => str ? parseInt(str.replace("GB", "")) : 0;
  const a = cleanString(aStr);
  const b = cleanString(bStr);
  if (a === b) return 0;
  return a > b ? 1 : -1;
};

const storageComparator = (aStr: string | null, bStr: string | null) => {
  if (!aStr || !bStr) return 0;
  const cleanString = (str: string) => {
    return str.includes("GB")
      ? parseFloat(str.replace("GB", ""))
      : parseFloat(str.replace("TB", "")) * 1000;
  };
  const a = cleanString(aStr);
  const b = cleanString(bStr);
  if (a === b) return 0;
  return a > b ? 1 : -1;
};

const columnDefs: ColDef[] = [
  { headerName: "", field: "url", width: 44, cellRenderer: Buy },
  {
    headerName: "Price",
    field: "price",
    width: 75,
    filter: "agNumberColumnFilter",
    sort: "asc",
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  { headerName: "Condition", field: "product-condition", width: 70 },
  { headerName: "Model", field: "model" },
  {
    headerName: "Screen Size",
    field: "screen-size",
    width: 70,
    valueFormatter: ({ value }) => value?.toFixed(1) ?? "",
    filter: "agNumberColumnFilter",
  },
  { headerName: "Resolution", field: "resolution", width: 100 },
  { headerName: "IPS Screen?", field: "screen-has-ips", width: 70 },
  { headerName: "Display", field: "display" },
  {
    headerName: "Memory Size",
    field: "memory-size",
    width: 70,
    comparator: memComparator,
  },
  { headerName: "Storage Type", field: "storage-type", width: 70 },
  {
    headerName: "Storage Size",
    field: "storage-size",
    width: 70,
    comparator: storageComparator,
  },
  { headerName: "Processor Brand", field: "processor-brand", width: 70 },
  { headerName: "Processor Range", field: "processor-range", width: 80 },
  { headerName: "Processor", field: "processor" },
  { headerName: "Wireless", field: "wlan" },
  { headerName: "Graphics", field: "graphic-card" },
  { headerName: "Camera", field: "camera" },
  { headerName: "Touchscreen?", field: "touch-screen", width: 70 },
  { headerName: "Storage", field: "storage" },
  { headerName: "Memory", field: "memory" },
  { headerName: "Memory Soldered?", field: "memory-soldered", width: 70 },
  { headerName: "Processor Cache", field: "processor-cache", width: 70 },
  { headerName: "Battery", field: "battery" },
  { headerName: "Warranty", field: "warranty" },
  { headerName: "Weight", field: "weight" },
  { headerName: "Operating System", field: "operating-system" },
  {
    headerName: "Original Price",
    field: "orig-price",
    width: 75,
    filter: "agNumberColumnFilter",
    valueFormatter: ({ value }) => value.toFixed(2),
  },
  {
    headerName: "Percentage Savings",
    field: "percentage-savings",
    width: 75,
    filter: "agNumberColumnFilter",
  },
  { headerName: "Fingerprint Reader", field: "fingerprint-reader" },
  { headerName: "Product Number", field: "product-number" },
  { headerName: "Keyboard", field: "keyboard" },
];

interface GridProps {
  data: LaptopData[],
};

const Grid = ({ data }: GridProps) => {
  return (
    <div className="ag-theme-balham-dark table-wrapper">
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={data}
        multiSortKey={"ctrl"}
        suppressCellFocus={true}
        enableCellTextSelection={true}
        onFirstDataRendered={onFirstDataRendered}
        onSortChanged={onSortOrFilterChange}
        onFilterChanged={onSortOrFilterChange}
      />
    </div>
  );
};

export default Grid;
