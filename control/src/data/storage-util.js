export const storageConfig = {
  userDataKey: "USER_DATA_KEY",
};

export function setJsonItem(key, json) {
  sessionStorage.setItem(key, JSON.stringify(json));
}

export function getJsonItem(key) {
  const json = sessionStorage.getItem(key);
  return JSON.parse(json)
}