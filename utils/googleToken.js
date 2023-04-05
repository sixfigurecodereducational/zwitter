const key = 'credential';

export function saveToken(credential) {
    localStorage.setItem(key, credential);
}

export function getToken() {
    const credential = localStorage.getItem(key);
    return credential;
}

export function deleteToken() {
    localStorage.removeItem(key);
}

export function isLoggedIn() {
    const credential = localStorage.getItem(key);
    if (credential == null) {
        return false;
    }

    const decodedCredential = decodeJwt(credential);
    const expirationTimestamp = decodedCredential.exp * 1000;
    const expirationDate = new Date(expirationTimestamp);
    const now = new Date();

    if (now >= expirationDate) {
        return false;
    }

    return true;
}


function decodeJwt(credential) {
    const base64Url = credential.split('.')[1];
    var decodedValue = JSON.parse(window.atob(base64Url));
    return decodedValue;
}

