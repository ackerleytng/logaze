import { useState, useEffect } from "react";

const storageAddr0 = "https://jsonblob.com/api/jsonBlob/1104252648328282112";
const storageAddr1 = "https://jsonblob.com/api/jsonBlob/1104252815584542720";

const loadFromStorageLocation = async (location) => {
    const response = await fetch(location);
    return response.json();
};

export const loadFromStorage = async () => {
    const part0 = await loadFromStorageLocation(storageAddr0);
    const part1 = await loadFromStorageLocation(storageAddr1);
    return part0.concat(part1);
};

export const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadFromStorage().then(setData);
  }, []);

  return data;
};

export const dataToCsv = (data) => {
  const header = Object.keys(data[0]);

  let csv = data.map((row) =>
    header
      .map(
        (fieldName) =>
          `"${(row[fieldName]?.toString() || "").replaceAll('"', '""')}"`
      )
      .join(",")
  );
  csv.unshift(header.join(","));
  return csv.join("\r\n");
};

export const download = (filename, data) => {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(data)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
