import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import "./../../css/login.css"
import LoadingOverlay from 'react-loading-overlay'
import { useNavigate } from "react-router-dom";
import { auth } from "./../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {setUserSession} from "./../Utils/common";


const Signup = () => {

    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [password1, setpassword1] = useState('');
    const [password2, setpassword2] = useState('');
    const [loading, setloading] = useState('');

    const navigate = useNavigate();

    const [message, setmessage] = useState('');

    const [code1, setcode1] = useState('');
    const [code2, setcode2] = useState('');
    const [code3, setcode3] = useState('');
    const [code4, setcode4] = useState('');

    document.body.style.overflow = 'auto';





    const [first, setfirst] = useState(true);
    const [verify, setverify] = useState(false);
    const [passwords, setpasswords] = useState(false);
    const [overlaystatus, setoverlaystatus] = useState(false);

    const [error, seterror] = useState('');

    const [showback, setshowback] = useState(true);

    useEffect(() => {

    }, []);
    const inputRef2 = React.createRef();
    const inputRef3 = React.createRef();
    const inputRef4 = React.createRef();




    const getcode = () => {
        /*  const valemail = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
          if (valemail) {
              console.log("valid email")
          } else {
              console.log("invalid email")
          }*/
        setfirst(false)
        setverify(true)
    }

    const verifycode = () => {
        setverify(false)
        setpasswords(true)
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
            <LoadingOverlay
                active={overlaystatus}
                spinner={
                    showback ?
                        <div style={{ width: "100%" }}>
                            <div style={{ width: 400, backgroundColor: "white", color: "black" }}>
                                <p className="loginquestion"> Start Over?<br />
                                    <p style={{ fontSize: 15 }}>Are you sure you want to start from the beginning?</p>
                                </p>
                                <button className="confirmbuttonyes" onClick={() => {
                                    setoverlaystatus(false)
                                    setverify(false)
                                    setfirst(true)
                                }}>Yes</button><br />
                                <button className="confirmbuttonno" onClick={() => {
                                    setoverlaystatus(false)
                                    setverify(true)
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

                }>
                <div className="loginheader">
                    <img src={require("./../../assets/headericon.jpg")} className="loginheaderimage" />
                    <div className="headermessage">{message}</div>
                </div>



                {first &&
                    <div className="loginform">
                        <p className="loginquestion">What's your phone number or <br /> email?</p>
                        <input type="text" className="logininput" value={email} onChange={(e) => setemail(e.target.value)} />
                        <div className="continuedetails">
                            By proceeding, you consent to get calls, WhatsApp or<br />
                            SMS messages, including by automated means, from Dot<br /> delivery
                            and its affiliates to the number provided.
                        </div>

                        <div className="nextbutton"
                            onClick={getcode}
                            style={{
                                color: !email ? "gray" : "white",
                                backgroundColor: !email ? "white" : "#ff9334",
                                cursor: !email ? "not-allowed" : "pointer"
                            }}>Next &nbsp;<FaArrowRight /></div>
                        <div className="continuedetails">
                            This site is protected by reCAPTCHA and the Google Privacy Policy
                            and Terms of Service apply.
                            <br /><br />
                        </div>
                    </div>
                }
                {verify &&
                    <div className="loginform">
                        <p className="loginquestion">Enter the four digit code sent to you <br />
                            at {email ? email : phone}
                        </p>
                        <input type="text" className="codeinput" autoFocus value={code1} onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (e.target.value === '' || re.test(e.target.value)) {
                                setcode1(e.target.value)
                                if (e.target.value) {
                                    if (inputRef2.current) { inputRef2.current.focus() }
                                }
                            }
                        }} />
                        <input type="text" className="codeinput" ref={inputRef2} value={code2} onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (e.target.value === '' || re.test(e.target.value)) {
                                setcode2(e.target.value)
                                if (e.target.value) {
                                    if (inputRef3.current) { inputRef3.current.focus() }
                                }
                            }
                        }} />
                        <input type="text" className="codeinput" ref={inputRef3} value={code3} onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (e.target.value === '' || re.test(e.target.value)) {
                                setcode3(e.target.value)
                                if (e.target.value) {
                                    if (inputRef4.current) { inputRef4.current.focus() }
                                }
                            }

                        }} />
                        <input type="text" className="codeinput" ref={inputRef4} value={code4} onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (e.target.value === '' || re.test(e.target.value)) {
                                setcode4(e.target.value)
                            }
                        }} />
                        <br />

                        <button className="resendbutton"
                            onClick={() => {
                                setshowback(false)
                                setoverlaystatus(true)
                            }}
                        >I did't receive a code</button>

                        <div className="navformbuttons">
                            <div className="navformbackbutton"
                                onClick={() => {
                                    setoverlaystatus(true)
                                    setshowback(true)
                                }}
                            > &nbsp;<FaArrowLeft />
                            </div>

                            <div className="navformnextbutton"
                                onClick={verifycode}
                                style={{
                                    color: !code1 || !code2 || !code3 || !code4 ? "gray" : "white",
                                    backgroundColor: !code1 || !code2 || !code3 || !code4 ? "white" : "#ff9334",
                                    cursor: !code1 || !code2 || !code3 || !code4 ? "not-allowed" : "pointer"
                                }}>Next &nbsp;<FaArrowRight />
                            </div>
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
                        <div style={{color:"red"}}>{error}</div>

                        <div className="nextbutton"
                            onClick={handlesignup}
                            style={{
                                color: !password1 || !password2 ? "gray" : "white",
                                backgroundColor: !password1 || !password2 ? "white" : "#ff9334",
                                cursor: !password1 || !password2 ? "not-allowed" : "pointer"
                            }}>{loading? <div>loading...</div>:<div>Next &nbsp;<FaArrowRight /></div>}</div>
                        <div className="continuedetails">
                            This site is protected by reCAPTCHA and the Google Privacy Policy
                            and Terms of Service apply.
                            <br /><br />
                        </div>
                    </div>
                }





            </LoadingOverlay>
        </div>

    )
}

export default Signup;