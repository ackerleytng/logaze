import { forwardRef, useImperativeHandle, useRef } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridEvent, ApplyColumnStateParams, ColDef, ColumnState } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { retrieveSettings, saveSettings, clearSettings } from "./gridSettings";
import { LaptopData } from "./data";

interface BuyProps {
  value: string,
  data: LaptopData,
};

const Buy = ({ value, data }: BuyProps) => {
  if (data && data["available"]) {
    return (
      <a target="_blank" rel="noopener noreferrer" href={value}>
	Buy
      </a>
    )
  } else {
    return undefined;
  }
};

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

  if (!event.api.applyColumnState({ state: columnState })) {
    console.error('Error applying column state!');
    clearSettings();
  }
};

const onFirstDataRendered = (event: AgGridEvent) => {
  retrieveAndApplySettings(event);
};

const onSortOrFilterChange = ({ api }: AgGridEvent) => {
  const columnState = api.getColumnState();
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
  { headerName: "",
    field: "url",
    width: 44,
    cellRenderer: Buy,
    filter: true,
    filterParams: {
      defaultOption: 'notBlank',
    },
  },
  {
    headerName: "Price",
    field: "price",
    width: 75,
    filter: "agNumberColumnFilter",
    sort: "asc",
    valueFormatter: ({ value }) => value?.toFixed(2) ?? "",
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
    valueFormatter: ({ value }) => value?.toFixed(2) ?? "",
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

const resetColumnState: ColumnState = {
  colId: "price",
  sort: "asc",
};

const resetColumnStateParams: ApplyColumnStateParams = {
  state: [resetColumnState],
  defaultState: {
    hide: null,
    flex: null,
    sort: null,
    sortIndex: null,
    aggFunc: null,
    pivot: null,
    pivotIndex: null,
    pinned: null,
    rowGroup: null,
    rowGroupIndex: null,
  }
};

interface GridProps {
  data: LaptopData[],
};

export type GridHandle = {
  resetGrid: () => void;
};

const Grid = forwardRef<GridHandle, GridProps>(({ data }, ref) => {
  const grid = useRef<AgGridReact>(null);

  useImperativeHandle(ref, () => ({
    resetGrid() {
      // No need to clear localStorage because resetting will cause onSortOrFilterChange to fire (and re-save localStorage)
      const gridApi = grid.current?.api;

      if (!gridApi) {
        return;
      }

      gridApi.applyColumnState(resetColumnStateParams);
      gridApi.setFilterModel(null);
    },
  }));

  return (
    <div id="table-wrapper" className="ag-theme-balham-dark">
      <AgGridReact
        ref={grid}
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
});

export default Grid;
