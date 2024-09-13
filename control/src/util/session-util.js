import { storageConfig, getJsonItem } from "./storage-util";

export function isSessionProjectReady() {
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
    if(rol === 1 || isSuperAdminRol(rol)) {
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

export function isAccountantRol(rol) {
    if(rol === 2) {
        return true;
    } else {
        return false;
    }
}

export function isAssistantRol(rol) {
    if(rol === 3) {
        return true;
    } else {
        return false;
    }
}
