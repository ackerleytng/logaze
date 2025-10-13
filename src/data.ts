import { useState, useEffect } from "react";

export type LaptopData = {[key: string]: string | number | boolean};

export type StoredData = {
  laptopData: LaptopData[];
  lastModified: Date;
};

const storageAddr0 = "https://pub-541ecefd362f4cae9488d0709bbbb5fa.r2.dev/part-0";
const storageAddr1 = "https://pub-541ecefd362f4cae9488d0709bbbb5fa.r2.dev/part-1";

const loadFromStorageLocation = async (location: string): Promise<StoredData> => {
  const response = await fetch(location);
  const lastModifiedString = response.headers.get("Last-Modified") as string;
  return {
    laptopData: await response.json(),
    lastModified: new Date(lastModifiedString),
  };
};

export const loadFromStorage = async (): Promise<StoredData> => {
  const { laptopData: part0, lastModified } = await loadFromStorageLocation(storageAddr0);
  const { laptopData: part1 } = await loadFromStorageLocation(storageAddr1);
  return {
    laptopData: part0.concat(part1),
    lastModified,
  };
};

const initialStoredData: StoredData = {
  laptopData: [],
  lastModified: new Date(),
}

export const useData = (): StoredData => {
  const [data, setData] = useState<StoredData>(initialStoredData);

  useEffect(() => {
    loadFromStorage().then(setData);
  }, []);

  return data;
};

export const dataToCsv = (data: LaptopData[]): string => {
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

export const download = (filename: string, data: string): void => {
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
