import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { getMenuSessionId } from "../Utils/common";

const Viewmenumeals = () =>{

    const menuid = getMenuSessionId();

    

    return(
        <div>
         <h1> {menuid}</h1>  
        </div>
    )
}

export default Viewmenumeals;