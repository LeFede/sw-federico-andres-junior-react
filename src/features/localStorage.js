export const saveToLocal = (key, value) => localStorage.setItem(key, value);
export const getFromLocal = key => localStorage.getItem(key);
export const saveObjectToLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const getObjectFromLocal = key => JSON.parse(localStorage.getItem(key));

