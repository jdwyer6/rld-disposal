const getSessionService = (key: string) => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : [null];
};
  
const setSessionService = (key: string, value: any) => {
const item = JSON.stringify(value);
sessionStorage.setItem(key, item);
};
  
const removeSessionService = (key: string) => {
sessionStorage.removeItem(key);
};
  
export { getSessionService, setSessionService, removeSessionService };