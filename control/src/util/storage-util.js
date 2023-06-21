export const storageConfig = {
  userDataKey: "USER_DATA_KEY",
  selectedProjectDataKey: "SELECTED_PROJECT_DATA_KEY",
};

export function setJsonItem(key, json) {
  sessionStorage.setItem(key, JSON.stringify(json));
}

export function getJsonItem(key) {
  const json = sessionStorage.getItem(key);
  if (json == null) {
    return json;
  } else {
    return JSON.parse(json);
  }
}