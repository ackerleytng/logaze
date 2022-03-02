import { useState, useEffect } from 'react';

export const loadFromStorage = () => {
  const storageAddr = 'https://jsonblob.com/api/jsonBlob/381d4455-63af-11ea-ad21-453934360a11';
  return fetch(storageAddr).then(response => response.json());
};

export const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadFromStorage().then(setData);
  }, []);

  return data;
};

export const dataToCsv = (data) => {
  const replacer = (key, value) => value === null ? '' : value;
  const header = Object.keys(data[0]);

  let csv = data.map(row => header.map(
    fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
  csv.unshift(header.join(','));
  return csv.join('\r\n');
}

export const download = (filename, data) => {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
