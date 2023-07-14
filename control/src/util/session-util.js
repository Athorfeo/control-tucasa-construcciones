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

export function isDefaultRol(rol) {
    if(rol === 0) {
        return true;
    } else {
        return false;
    }
}

export function isAdminRol(rol) {
    if(rol > 0 || isSuperAdminRol(rol)) {
        return true;
    } else {
        return false;
    }
}

export function isSuperAdminRol(rol) {
    if(rol === -1) {
        return true;
    } else {
        return false;
    }
}
