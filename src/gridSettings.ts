import { ColumnState } from "ag-grid-community";

type AgGridFilterModel = { [key: string]: any };

interface GridDisplayConfig {
  columnState: ColumnState[],
  filterModel: AgGridFilterModel,
};

const version = 'V1';

const buildSettingsKey = (): string => 'gridSettings' + version;

export const retrieveSettings = (): GridDisplayConfig | null => {
  const value = window.localStorage.getItem(buildSettingsKey());

  return value ? JSON.parse(value) : null;
}

export const saveSettings = (columnState: ColumnState[], filterModel: AgGridFilterModel): void => {
  const value = JSON.stringify({ columnState, filterModel });

  window.localStorage.setItem(buildSettingsKey(), value);
}

export const clearSettings = (): void => {
  window.localStorage.removeItem(buildSettingsKey());
}
