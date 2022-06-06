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

//get cart no session
export const getcartSessionno = () => {
    const userStr = sessionStorage.getItem("cartno");
    if (userStr) return JSON.parse(userStr);
    else return null;
}
//set cartno session 
export const setcartSessionno = (cartno) => {
    sessionStorage.setItem("cartno", JSON.stringify(cartno));
}

//get cart session
export const getcartSession = () => {
    const userStr = sessionStorage.getItem("cart");
    if (userStr) return JSON.parse(userStr);
    else return null;
}
//set cart session 
export const setcartSession = (cart) => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
}
//logout 
export const logoutUser = () =>{
    localStorage.removeItem("user")
}

