import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import "./../../css/login.css"
import { useNavigate } from "react-router-dom";
import { auth } from "./../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setUserSession, setLocalStorageUser } from "./../Utils/common";
import { collection, getDocs, query, where,addDoc,setDoc,doc } from "@firebase/firestore"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { db } from "./../../firebase-config";


const Signup = () => {

    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [password1, setpassword1] = useState('');
    const [password2, setpassword2] = useState('');
    const [loading, setloading] = useState('');

    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [countryin, setcountryin] = useState('BW');
    const [country, setcountry] = useState('');
    const [username, setusername] = useState('');

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
        getlocation();
    }, []);

    const getlocation = () => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setlatitude(position.coords.latitude)
                setlongitude(position.coords.longitude)
            },
            function (error) {
                seterror(error.message + ". PLease allow location to continue");
            }
        );

    }





    const checkphone = () => {
        seterror(null)
        if (!phone) {

        } else {
            var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            if (re.test(phone)) {
                setfirst(false)
                setsecond(true)
            } else {
                seterror("invalid phone number")

            }
        }
    }

    const checkemail = () => {
        seterror(null)
        if (!email) {

        } else {
            const valemail = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if (valemail) {
                setpasswords(true)
                setsecond(false)
            } else {

                seterror("Invalid email address")
            }
        }

    }

    const getUser = (email) => {
        const getuse = query(collection(db, "users"), where("email", "==", email));

        getDocs(getuse).then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                setLocalStorageUser((doc.id, "=>", doc.data()))
                setloading(false)
                navigate("/fetchfoods")
            });
        })
            .catch(function (error) {
                seterror("Error getting documents: ", error);
            });
    }

    const regionNames = new Intl.DisplayNames(
        ['en'], { type: 'region' }
    );
   
   
  

    const handlesignup = async () => {
        setloading(true)
        seterror(null)
       
        var currentdate = new Date();
        const myname = username?.split(" ");

        if (!email || !password1 || !password2) {

        }
        else if (password1 !== password2) {
            seterror("passwords provided do not match")
        }
        else if (!latitude || !longitude) {
            getlocation();
        }
        else {

            try {
                const user = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password1
                );

                if (user.user.email) {
                  
                    try{
                        const add =  await setDoc(doc(db, "users", user.user.uid), {
                            countryCode: phone.substring(0,4),
                            country: country,
                            email:email,
                            phoneNumber: phone,
                            unid: user.user.uid,
                            type: "User",
                            status: "active",
                            timestamp: currentdate,
                            statusCode: 1,
                            fromApp: "Dot delivery site" ,
                            firstName: myname[0] && myname[0],
                            lastName: myname[1] && myname[1]  ,
                            displayName: username,
                        });
                 
                    if(!add){
                        getUser(user.user.email)
                    }
                }catch(error){
                    setloading(false)
                    console.log(error.message)
                }
                  
                } else {
                    setloading(false)
                    seterror("there was an internal error. contact admin")
                }
            } catch (error) {
                setloading(false)
                seterror(error.message)
                
            }

        }
    }
    return (
        <div style={{ paddingBottom: 50 }}>

            {overlaystatus ? showback ?
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
                : null
            }
            <div className="loginheader">
                <img src={require("./../../assets/headericon.jpg")} className="loginheaderimage" />
                <div className="headermessage">{message}</div>
            </div>



            {first &&
                <div className="loginform">
                    <p className="loginquestion">What's your phone number?</p>
                    <PhoneInput
                        placeholder="Enter phone number"
                        value={phone}
                        defaultCountry="BW"
                        onCountryChange={setcountryin}
                        onChange={setphone} />

                    <div className="continuedetails">
                        By proceeding, you consent to get calls, WhatsApp or<br />
                        SMS messages, including by automated means, from Dot<br /> delivery
                        and its affiliates to the number provided.
                    </div>
                    <div style={{ color: "red" }}>{error}</div>

                    <div className="nextbutton"
                        onClick={()=>{
                            setcountry(regionNames.of(countryin))
                            checkphone();
                        }}
                        style={{
                            color: !phone ? "gray" : "white",
                            backgroundColor: !phone ? "white" : "#ff9334",
                            cursor: !phone ? "not-allowed" : "pointer"
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
                    <p className="loginquestion">What's your email address ?</p>
                    <input type="text" className="logininput" value={email} onChange={(e) => setemail(e.target.value)} />
                    <div className="continuedetails">
                        By proceeding, you consent to emails, <br />
                        including by automated means, from Dot<br /> delivery
                        and its affiliates to the address provided.
                    </div>
                    <div style={{ color: "red" }}>{error}</div>
                    <div className="navformbuttons">
                        <div className="navformbackbutton"
                            onClick={() => {
                                setsecond(false)
                                setfirst(true)
                            }}
                        > &nbsp;<FaArrowLeft />
                        </div>

                        <div className="navformnextbutton"
                            onClick={checkemail}
                            style={{
                                color: !email ? "gray" : "white",
                                backgroundColor: !email ? "white" : "#ff9334",
                                cursor: !email ? "not-allowed" : "pointer"
                            }}>Next &nbsp;<FaArrowRight />
                        </div>
                    </div>
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
                    <p className="loginquestion"> Enter your username and<br /> password</p>
                    <input type="text" className="logininput" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} />
                    <br /><br />
                    <input type="password" className="logininput" placeholder="password" value={password1} onChange={(e) => setpassword1(e.target.value)} />
                    <br /><br />
                    <input type="password" className="logininput" placeholder="confirm password" value={password2} onChange={(e) => setpassword2(e.target.value)} />
                    <div style={{ fontSize: 10, color: "maroon", fontFamily: "cursive" }}>*passwords must be 6 or more characters long</div>
                    <div className="continuedetails">
                        By proceeding, you consent to get calls, WhatsApp or<br />
                        SMS messages, including by automated means, from Dot<br /> delivery
                        and its affiliates to the contacts provided.
                    </div>
                    <div style={{ color: "red" }}>{error}</div>

                    <div className="navformbuttons">
                        <div className="navformbackbutton"
                            onClick={() => {
                                setsecond(true)
                                setpasswords(false)
                            }}
                        > &nbsp;<FaArrowLeft />
                        </div>

                        <div className="navformnextbutton"
                            onClick={handlesignup}
                            style={{
                                color: !password1 || !password2 ? "gray" : "white",
                                backgroundColor: !password1 || !password2 ? "white" : "#ff9334",
                                cursor: !password1 || !password2 ? "not-allowed" : "pointer"
                            }}>{loading ? <div>loading...</div> : <div>Next &nbsp;<FaArrowRight /></div>}
                        </div>
                    </div>
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