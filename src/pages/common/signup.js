import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import "./../../css/login.css"
import { useNavigate } from "react-router-dom";
import { auth } from "./../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setUserSession } from "./../Utils/common";


const Signup = () => {

    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [value1, setvalue1] = useState('');
    const [value2, setvalue2] = useState('');
    const [value3, setvalue3] = useState('');
    const [password1, setpassword1] = useState('');
    const [password2, setpassword2] = useState('');
    const [loading, setloading] = useState('');

    const navigate = useNavigate();

    const [message, setmessage] = useState('');

    document.body.style.overflow = 'auto';

    const [first, setfirst] = useState(true);
   const [second, setsecond] = useState(false);
    const [passwords, setpasswords] = useState(false);
    const [overlaystatus, setoverlaystatus] = useState(false);

    const [error, seterror] = useState('');

    const [showback, setshowback] = useState(false);

    useEffect(() => {

    }, []);
  




    const checkfield = () => {
          const valemail = value1.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
          if (valemail) {
              setemail(value1)
              setvalue2("phone number")
          } else {
            setphone(value1)
            setvalue2("email")
          }
        setfirst(false)
        setsecond(true)
      
    }

    const checksecondfield = () =>{
        const valemail = value3.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (valemail) {
            setemail(value3)
        } else {
          setphone(value3)
        }
      setpasswords(true)
      setsecond(false) 
    }

   

    const handlesignup = async () => {

        if (!email || !password1 || !password2) {

        } else {

            try {
                const user = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password1
                );

                if (user.user.email) {
                    setloading(false)
                    setUserSession(user.user)
                    navigate("/fetchfoods")
                } else {
                    setloading(false)
                    seterror("there was an internal error. contact admin")
                }
            } catch (error) {
                seterror("there was an error")
            }

        }
    }
    return (
        <div style={{ paddingBottom: 50 }}>

            {overlaystatus? showback ?
                <div style={{ width: "100%" }}>
                    <div style={{ width: 400, backgroundColor: "white", color: "black" }}>
                        <p className="loginquestion"> Start Over?<br />
                            <p style={{ fontSize: 15 }}>Are you sure you want to start from the beginning?</p>
                        </p>
                        <button className="confirmbuttonyes" onClick={() => {
                            setoverlaystatus(false)
                            setsecond(false)
                            setfirst(true)
                        }}>Yes</button><br />
                        <button className="confirmbuttonno" onClick={() => {
                            setoverlaystatus(false)
                            setsecond(true)
                        }}>No</button>

                    </div>
                </div> :
                <div style={{ width: "100%" }}>
                    <div style={{ width: 400, backgroundColor: "white", color: "black", paddingTop: 10 }}>

                        <button className="confirmbuttonyes" onClick={() => {
                            setoverlaystatus(false)
                            setmessage("Code resent")
                        }}>Resend code via SMS</button><br />
                        <button className="confirmbuttonno" onClick={() => {
                            setoverlaystatus(false)
                        }}>Cancel</button>

                    </div>
                </div>
                :null
            }
            <div className="loginheader">
                <img src={require("./../../assets/headericon.jpg")} className="loginheaderimage" />
                <div className="headermessage">{message}</div>
            </div>



            {first &&
                <div className="loginform">
                    <p className="loginquestion">What's your phone number or <br /> email?</p>
                    <input type="text" className="logininput" value={value1} onChange={(e) => setvalue1(e.target.value)} />
                    <div className="continuedetails">
                        By proceeding, you consent to get calls, WhatsApp or<br />
                        SMS messages, including by automated means, from Dot<br /> delivery
                        and its affiliates to the number provided.
                    </div>

                    <div className="nextbutton"
                        onClick={checkfield}
                        style={{
                            color: !value1 ? "gray" : "white",
                            backgroundColor: !value1 ? "white" : "#ff9334",
                            cursor: !value1 ? "not-allowed" : "pointer"
                        }}>Next &nbsp;<FaArrowRight /></div>
                    <div className="continuedetails">
                        This site is protected by reCAPTCHA and the Google Privacy Policy
                        and Terms of Service apply.
                        <br /><br />
                    </div>
                </div>
            }
            {second &&
                <div className="loginform">
                    <p className="loginquestion">What's your {value2} ?</p>
                    <input type="text" className="logininput" value={value3} onChange={(e) => setvalue3(e.target.value)} />
                    <div className="continuedetails">
                        By proceeding, you consent to get calls, WhatsApp or<br />
                        SMS messages, including by automated means, from Dot<br /> delivery
                        and its affiliates to the number provided.
                    </div>

                    <div className="nextbutton"
                        onClick={checksecondfield}
                        style={{
                            color: !value3 ? "gray" : "white",
                            backgroundColor: !value3 ? "white" : "#ff9334",
                            cursor: !value3 ? "not-allowed" : "pointer"
                        }}>Next &nbsp;<FaArrowRight /></div>
                    <div className="continuedetails">
                        This site is protected by reCAPTCHA and the Google Privacy Policy
                        and Terms of Service apply.
                        <br /><br />
                    </div>
                </div>
            }
           
            {
                passwords &&
                <div className="loginform">
                    <p className="loginquestion"> Enter your password and<br /> confirm</p>
                    <input type="password" className="logininput" placeholder="password" value={password1} onChange={(e) => setpassword1(e.target.value)} />
                    <br /><br />
                    <input type="password" className="logininput" placeholder="confirm password" value={password2} onChange={(e) => setpassword2(e.target.value)} />

                    <div className="continuedetails">
                        By proceeding, you consent to get calls, WhatsApp or<br />
                        SMS messages, including by automated means, from Dot<br /> delivery
                        and its affiliates to the number provided.
                    </div>
                    <div style={{ color: "red" }}>{error}</div>

                    <div className="nextbutton"
                        onClick={handlesignup}
                        style={{
                            color: !password1 || !password2 ? "gray" : "white",
                            backgroundColor: !password1 || !password2 ? "white" : "#ff9334",
                            cursor: !password1 || !password2 ? "not-allowed" : "pointer"
                        }}>{loading ? <div>loading...</div> : <div>Next &nbsp;<FaArrowRight /></div>}</div>
                    <div className="continuedetails">
                        This site is protected by reCAPTCHA and the Google Privacy Policy
                        and Terms of Service apply.
                        <br /><br />
                    </div>
                </div>
            }






        </div>

    )
}

export default Signup;