const getSessionService = (key) => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : [null];
};
  
const setSessionService = (key, value) => {
const item = JSON.stringify(value);
sessionStorage.setItem(key, item);
};
  
const removeSessionService = (key) => {
sessionStorage.removeItem(key);
};
  
export { getSessionService, setSessionService, removeSessionService };