const version = 'V1';

const buildSettingsKey = () => 'gridSettings' + version;

export const retrieveSettings = () => {
  const value = window.localStorage.getItem(buildSettingsKey());

  return value ? JSON.parse(value) : null;
}

export const saveSettings = (columnState, filterModel) => {
  const value = JSON.stringify({ columnState, filterModel });

  window.localStorage.setItem(buildSettingsKey(), value);
}

export const clearSettings = () => {
  window.localStorage.removeItem(buildSettingsKey());
}
