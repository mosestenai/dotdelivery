import React, { useState, useEffect } from "react";
import { FaBeer, FaBars, FaTimes, FaAndroid } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import {getLocalStorageUser} from "./../Utils/common";
let color = "#ff9334";
let type = "spinningBubbles";



const Home = () => {

    const user = getLocalStorageUser();
    const navigate = useNavigate();
    if(user){
        navigate("./fetchfoods")
    }

    const list = [
        'Unexpected guests?',
        'Gaming night?',
        'Late night at office?',
        'Cooking gone wrong?',
        'Movie marathon?',
        'Hungry'
    ];
    useEffect(() => {
        setTimeout(() => setoverlaystatus(false), 5000);
    }, []);

    const [number, setnumber] = useState(0);
    const data = list[number];
    const [overlaystatus, setoverlaystatus] = useState(true);
    const [displaysidenav, setdisplaysidenav] = useState(false);
    const [scroll, setscroll] = useState('auto');
    const [show, setshow] = useState(1);


    document.body.style.overflow = scroll
    document.body.style.opacity = show;


    if (number === 6) {
        setnumber(0)
    } else {
        setTimeout(() => setnumber(number + 1), 6000);
    }



    return (
        <div>
            <div className="homenav">
                {displaysidenav &&
                    <div className="sidemenu">
                        <FaTimes className="sidecancel" onClick={() => {
                            setscroll('auto')
                            setdisplaysidenav(false)
                        }} />
                        <button className="sidelogin" onClick={()=>navigate('/login')}>LOGIN</button><br /><br />
                        <button className="sidesignup" onClick={()=>navigate('/signup')}>SIGN UP</button><br /><br />
                        <div className="sidewrap">
                            <div className="sidelinks">
                                <a href="">Create a business account</a>
                                <a href="">Add your restaurant</a>
                                <a href="">Sign up to deliver</a>
                                <a href="">Faqs</a>
                            </div>
                        </div>
                        <div className="sideappmenu">
                            <img src={require('./../../assets/icon.jpg')} className="sideappicon" />
                            <p className="sideappdescription">There's more to love in<br /> the app</p>
                        </div>
                        <div className="platformlinks">
                            <div><FaAndroid /></div>
                            <button className="androidlink">Android</button></div>
                    </div>
                }
                <FaBars className="barsicon" onClick={() => {
                    setscroll('hidden')
                    setdisplaysidenav(true)
                }} />
                <button className="loginbutton" onClick={()=>navigate('/login')}>Login</button>
                <button className="signupbutton" onClick={()=>navigate('/signup')}>Sign up</button>
            </div>

           
            <div>
                <p className="favourite">Your favourite food <br />
                    <font color="#ff9334">delivery</font> partner</p>

            </div>

            <div className="deliverylocation">
                <img src={require('./../../assets/homelogo.jpg')} width='100' height={100} />
                <div>
                    <p className="iteratedata">{data}<br />
                        <p className="iteratedatabelow">Order food from favourite restaurants near you.</p>
                    </p>
                    <div className="wrapform">
                        <input type="text" className="deliverylocationinput" placeholder="Enter your delivery location" />
                        <button className="locateme">LOCATE ME</button>
                        <button className="searchfoodbutton">FIND FOOD</button>
                    </div>
                </div>
            </div>
            <br />
            <div className="space">

            </div>

            <div style={{ backgroundColor: "#2b1e16" }}>
                <div className="homemiddlemobile">
                    <div className="steps">
                        <p align="middle"><img src={require('./../../assets/first.png')} width='150' height='150' /> </p>
                        <p align="middle" style={{ color: "white" }}>
                            <b>No Minimum Order</b> <br />
                            Order in for yourself or for the group,<br />
                            with no restrictions on order value
                        </p>
                    </div>
                    <div className="steps">
                        <p align="middle"><img src={require('./../../assets/second.png')} width='150' height='150' /> </p>
                        <p align="middle" style={{ color: "white" }}>
                            <b>Live Order Tracking</b> <br />
                            Know where your order is at all times,<br />
                            from the restaurant to your doorstep
                        </p>
                    </div>
                    <div className="steps">
                        <p align="middle"><img src={require('./../../assets/third.png')} width='150' height='150' /> </p>
                        <p align="middle" style={{ color: "white" }}>
                            <b>Lightning-Fast Delivery</b> <br />
                            Experience dot's superfast delivery<br />
                            for food delivered fresh & on time
                        </p>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "white" }}>
                <div className="homemiddlepic">
                    <img src={require('./../../assets/homemiddle.png')} width='100%' />
                </div>

                <div className="googleappdiv">
                    <div>
                        <p className="appdescription">
                            Restaurants in<br /> your pocket
                        </p>
                        <p className="appdescriptionbelow">
                            Order from your favorite restaurants & track <br />on the go, with the all-new dotdelivery app
                        </p>
                    </div>
                    <div className="googlebutton">
                        <img src={require('./../../assets/google.png')} style={{ cursor: "pointer" }} width='100%' />
                    </div>
                </div>
            </div>

        </div>
       
    )

}

export default Home;