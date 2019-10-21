import { useState, useEffect } from 'react';

const loadFromJsonbin = () => {
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
