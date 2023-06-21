import { storageConfig, getJsonItem } from "./storage-util";

export function isSessionReady() {
    let user = getJsonItem(storageConfig.userDataKey);
    let project = getJsonItem(storageConfig.selectedProjectDataKey);

    if (user == null || project == null) {
        return false;
    } else {
        return true;
    }
}