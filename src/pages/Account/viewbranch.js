import { useLocation, useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import {
    FaBars, FaTimes, FaSearch, FaMapMarker, FaShoppingCart, FaHeart, FaUser, FaAndroid,
    FaFile, FaSignOutAlt, FaLocationArrow, FaClock, FaQuestionCircle, FaFacebookMessenger, FaIdCard,
    FaStar, FaUtensils
} from 'react-icons/fa';
import { db } from "./../../firebase-config";
import SlidingPanel from 'react-sliding-side-panel';
import ReactLoading from 'react-loading';
import { getRestaurantSessionName, getLocalStorageUser, logoutUser, getBranchSessiondetails } from "./../Utils/common";
import { collection, getDocs, query, where, orderBy, startAt, endAt } from "@firebase/firestore"
import Geocode from "react-geocode";
import "./../../css/branch.css";


let color = "#ff9334";
let type = "spinningBubbles";


const Viewbranch = () => {
    const navigate = useNavigate();
    const user = getLocalStorageUser();
    const branch = getBranchSessiondetails();
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState('');

    const [meals, setmeals] = useState([]);
    const [reviews, setreviews] = useState([]);
    const [display, setdisplay] = useState(false);

    const [longitude, setlongitude] = useState('');
    const [latitude, setlatitude] = useState('');
    const [useraddress, setuseraddress] = useState('');

    const [displaysidenav, setdisplaysidenav] = useState(false);
    const [scroll, setscroll] = useState('auto');

    const [showlogout, setshowlogout] = useState(false);
    const [opacity, setopacity] = useState(1);

    useEffect(() => {

        getlocation();
        fetchBranches();

    }, [])

    //fetch branches with restaurant name
    const fetchBranches = () => {
        const getuse = query(collection(db, "meals"), where("restaurant", "==", branch.restaurant));

        /*  const data = await getDocs(menucollection);
          setmenu(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));*/

        getDocs(getuse).
            then(function (querySnapshot) {
                setloading(false)
                setmeals(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                setdisplay(true)
            })
            .catch(function (error) {
                seterror("Error getting documents: ", error);
            });

    }

    //calculate distance between user and restaurant
    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return Math.round(d);
    }
    function toRad(Value) {
        return Value * Math.PI / 180;
    }
    //get user location address based on his/her cordinates
    const getaddress = (long, lat) => {
        Geocode.setApiKey(process.env.REACT_APP_MAP_API_KEY);
        Geocode.setLanguage("en");
        Geocode.setRegion("es");
        Geocode.setLocationType("ROOFTOP");
        Geocode.enableDebug();
        Geocode.fromLatLng(lat, long).then(
            (response) => {
                const address = response.results[0].formatted_address;
                setuseraddress(address)
            },
            (error) => {
                console.error(error);
            }
        );
    }

    //get current user location
    const getlocation = () => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setlatitude(position.coords.latitude)
                setlongitude(position.coords.longitude)
                getaddress(position.coords.longitude, position.coords.latitude);
            },
            function (error) {
                alert(error.message + ". PLease allow location to continue");
            }
        );

    }

    const onlogout = () => {
        logoutUser();
        navigate("/");
    }





    return (
        <div style={{ paddingTop: 0, backgroundColor: "white" }}>
            <div className="userheader">
                {showlogout && <div className="logoutdiv">
                    <div style={{ fontSize: 20, fontWeight: "bold" }}> Confirm to Logout</div>
                    <div> Are you sure you want to logout?</div><br />
                    <button className="logoutbuttons" onClick={onlogout}>Yes, logout</button>
                    <button className="logoutbuttons" onClick={() => {
                        setshowlogout(false)
                        setopacity(1)
                    }}>No</button>
                </div>}
                {displaysidenav &&
                    <div className="userssidemenu " style={{ opacity: opacity }}>
                        <FaTimes className="sidecancel" style={{ marginTop: 20 }} onClick={() => {
                            setscroll('auto')
                            setdisplaysidenav(false)
                        }} />
                        <div className="sidenavaccountheader" style={{ marginTop: 30 }}>
                            <FaUser className="usericon" />
                            <p>
                                {user?.email}
                            </p>
                        </div>
                        <div className="sidewrap2">
                            <div className="sidelinks">
                                <div><FaUser className="link-icons" /> Profile details</div>
                                <div><FaClock className="link-icons" />My Orders</div>
                                <div><FaFacebookMessenger className="link-icons" />My chats</div>
                                <div><FaIdCard className="link-icons" />Payment details</div>
                                <div><FaLocationArrow className="link-icons" />Delivery Address</div>
                                <div><FaAndroid className="link-icons" />Help</div>
                                <div><FaQuestionCircle className="link-icons" />Frequently asked questions</div>
                                <div><FaFile className="link-icons" />Terms of Service</div>
                                <div onClick={() => {
                                    setshowlogout(true)
                                    setopacity(0)
                                }} ><FaSignOutAlt className="link-icons" />Sign Out</div>
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

                <FaBars className="usersbarsicon" onClick={() => {
                    setscroll('hidden')
                    setdisplaysidenav(true)
                }} />

                <img src={require('./../../assets/homelogo.jpg')} className="usershomelogo" />
                <div className="userslocation" style={{ opacity: opacity }}>
                    <FaMapMarker className="userslocationicon" />
                    <p>{useraddress.substring(10, 31)}</p>
                </div>
            </div>
           
                <div className="foodsandheaderwrap" style={{ opacity: opacity }}>
                    <div className="branchbody">
                    <img src={branch.branchImg} /><br />
                        </div>
                    <div className="foodsheader" >
                        Meals
                    </div>
                    {display ?
                        <div className="foodswrap">
                            {meals?.map((val, key) => {


                                return (
                                    <div className="foods" key={key} onClick={() => {
                                        navigate("/viewmenumeal")
                                    }}>
                                        {/*<FaHeart className="likeicon" />*/}
                                        <img src={val.mealImage} /><br />
                                        <div className="foodcontentdetails">
                                            <div className="foodrestaurant">{val.mealName.substring(0, 10)}</div>
                                        </div>
                                        <div className="fooddeliveryprice"><FaUtensils color="#ff9334" size={10} />{val.mealPrice}</div>
                                    </div>
                                )
                            })}

                        </div>
                        : <div style={{ marginLeft: "40%" }}><ReactLoading type={type} color={color} height={200} width={100} /></div>}
                </div>
            
            {error && < h5 align="middle" style={{ color: "red" }}>{error}</h5>}
            {loading && <div style={{ marginLeft: "40%" }}><ReactLoading type={type} color={color} height={200} width={100} /></div>}

        </div>
    )
}

export default Viewbranch;