export const getSessionUser = () => {
    const userStr = sessionStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    else return null;
}
export const getLocalStorageUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    else return null;
}


export const getToken = () => {
    return sessionStorage.getItem("token") || null;
}

export const setUserSession = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
}
export const setLocalStorageUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}

export const removeStudentSession = () => {
    sessionStorage.removeItem("student");
    localStorage.removeItem("student");

}
//get menu sessionid
export const getMenuSessionId = () => {
    const userStr = localStorage.getItem("menu");
    if (userStr) return JSON.parse(userStr);
    else return null;
}


//set menu session 
export const setMenuSessionId = (menuid) => {
    sessionStorage.setItem("menu", JSON.stringify(menuid));
}

