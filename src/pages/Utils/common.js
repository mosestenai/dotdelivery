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
//get restaurant session name
export const getRestaurantSessionName = () => {
    const userStr = sessionStorage.getItem("restaurant");
    if (userStr) return JSON.parse(userStr);
    else return null;
}

//set restaurant session 
export const setRestaurantSessionName = (restaurantname) => {
    sessionStorage.setItem("restaurant", JSON.stringify(restaurantname));
}


//get branch session
export const getBranchSessiondetails = () => {
    const userStr = sessionStorage.getItem("branch");
    if (userStr) return JSON.parse(userStr);
    else return null;
}

//set branch session 
export const setBranchSessiondetails = (branch) => {
    sessionStorage.setItem("branch", JSON.stringify(branch));
}
//logout 
export const logoutUser = () =>{
    localStorage.removeItem("user")
}

