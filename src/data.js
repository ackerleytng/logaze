import { useState, useEffect } from 'react';

export const loadFromJsonbin = () => {
  const binId = '5dac6fed5751f76337fd4ac2';
  const jsonbinAddr = `https://api.jsonbin.io/b/${binId}/latest`;

  return fetch(jsonbinAddr).then(response => response.json());
};

export const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadFromJsonbin().then(setData);
  }, []);

  return data;
};

export const dataToCsv = (data) => {
  console.log({conv: data});
  const replacer = (key, value) => value === null ? '' : value;
  const header = Object.keys(data[0]);

  let csv = data.map(row => header.map(
    fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
  csv.unshift(header.join(','));
  return csv.join('\r\n');
}

export const download = (filename, data) => {
  console.log({dldata: data});
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
