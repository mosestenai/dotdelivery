import React, { useState } from "react";
import { FaArrowRight } from 'react-icons/fa';
import "./../../css/login.css"
import { } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth ,db} from "../../firebase-config";
import { collection, getDocs,query,where } from "@firebase/firestore"
import {setUserSession,setLocalStorageUser} from "./../Utils/common";

let color = "#ff9334";
let type = "spin";


const Login = () => {
    const navigate = useNavigate();

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');
    const [loading, setloading] = useState(false);

    document.body.style.overflow = 'auto';

    const getUser = (email) => {
        const getuse = query(collection(db, "users"), where("email", "==", email));

        getDocs(getuse).then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                setLocalStorageUser((doc.id,"=>",doc.data()))
                setloading(false)
                navigate("/fetchfoods")
            });
        })
            .catch(function (error) {
                seterror("Error getting documents: ", error);
            });
    }


    const handlelogin = async () => {
        seterror(null)
        if (!email || !password) {
            
        } else {
            setloading(true)
            try {
                const user = await signInWithEmailAndPassword(auth, email, password);

                if (user.user.email) {
                  getUser(user.user.email)
                } else {
                    setloading(false)
                    seterror("there was an internal error. contact admin")
                }
            } catch (error) {
                setloading(false)
                console.log(error.message)
                seterror("invalid credentials")
            }
        }
    }
    return (
        <div style={{ paddingBottom: 50 }}>
            <div className="loginheader">
                <img src={require("./../../assets/headericon.jpg")} className="loginheaderimage" />
            </div>
            <div className="loginform">
                <p className="loginquestion">What's your login details?</p>
                <input type="text" className="logininput" placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} /><br />
                <br />
                <input type="password" className="logininput" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                <div style={{color:"red"}}>{error}</div>
                
                <div className="continuedetails">
                    Forgot password? Reset
                </div>
                <div className="nextbutton"
                    onClick={handlelogin}
                    style={{
                        color: !email || !password ? "gray" : "white",
                        backgroundColor: !email || !password ? "white" : "#ff9334",
                        cursor: !email || !password ? "not-allowed" : "pointer"
                    }}>{(loading) ? <div>loading...</div>
                        : <div>Next &nbsp;<FaArrowRight /></div> }  </div>
                <div className="continuedetails">
                    This site is protected by reCAPTCHA and the Google Privacy Policy
                    and Terms of Service apply.
                    <br /><br />
                </div>
            </div>
        </div>
    )
}

export default Login;