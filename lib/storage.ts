export const setItem = (key: string, value: any): void => {
  if (typeof window === "undefined") return; // Ensure this runs only in the browser
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item in localStorage: ${error}`);
  }
};

export const getItem = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null; // Ensure this runs only in the browser
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) return null;
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error(`Error getting item from localStorage: ${error}`);
    return null;
  }
};

export const removeItem = (key: string): void => {
  if (typeof window === "undefined") return; // Ensure this runs only in the browser
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from localStorage: ${error}`);
  }
};

export const clearStorage = (): void => {
  if (typeof window === "undefined") return; // Ensure this runs only in the browser
  try {
    localStorage.clear();
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`);
  }
};