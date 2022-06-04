import React from "react";
import { useLocation,useNavigate } from "react-router-dom";

const Viewmenumeals = () =>{

    const location = useLocation();
    const path = location.pathname.split("/")[2]; 

    return(
        <div>
         <h1> {path}</h1>  
        </div>
    )
}

export default Viewmenumeals;