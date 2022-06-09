import React, { useState, useEffect } from "react";
import {
    FaBars, FaTimes, FaSearch, FaMapMarker, FaShoppingCart, FaHeart, FaUser, FaAndroid,
    FaFile, FaSignOutAlt, FaLocationArrow, FaClock, FaQuestionCircle, FaFacebookMessenger, FaIdCard,
    FaStar, FaUtensils
} from 'react-icons/fa';
import "./../../css/users.css";
import { db } from "./../../firebase-config";
import SlidingPanel from 'react-sliding-side-panel';
import ReactLoading from 'react-loading';
import { getSessionUser, getLocalStorageUser, logoutUser, setRestaurantSessionName ,getcartSessionno} from "./../Utils/common";
import { collection, getDocs, query, where } from "@firebase/firestore"
import { useNavigate } from "react-router-dom";
import Geocode from "react-geocode";



let color = "#ff9334";
let type = "spinningBubbles";


const Fetchfoods = () => {

    const user = getLocalStorageUser();
    const navigate = useNavigate();
    const cartno = getcartSessionno();
    const [display, setdisplay] = useState(false);

    const [displaysidenav, setdisplaysidenav] = useState(false);
    const [scroll, setscroll] = useState('auto');
    const [openPanel, setOpenPanel] = useState(true);

    const [longitude, setlongitude] = useState('');
    const [latitude, setlatitude] = useState('');
    const [showlogout, setshowlogout] = useState(false);
    const [opacity, setopacity] = useState(1);


    const [restaurants, setrestaurants] = useState([]);
    const [menu, setmenu] = useState([]);
    const [useraddress, setuseraddress] = useState('');

    document.body.style.overflow = scroll
    const [overlaystatus, setoverlaystatus] = useState(false);

    const restaurantscollectionRef = collection(db, "branches");
    const menucollection = collection(db, "menus")


    useEffect(() => {
        const getRestaurants = async () => {
            const data = await getDocs(restaurantscollectionRef);
            setrestaurants(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setdisplay(true)
        }
        const getMenus = async () => {
            const data = await getDocs(menucollection);
            setmenu(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setdisplay(true)
        }

        getMenus();
        getRestaurants();
        getlocation();

    }, [])


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

    //scroll page to view all restaurants
    const viewallrestaurants = () => {
        document.getElementById("restaurants").scrollIntoView({ behavior: 'smooth' });
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
        // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
        Geocode.setApiKey(process.env.REACT_APP_MAP_API_KEY);

        // set response language. Defaults to english.
        Geocode.setLanguage("en");

        // set response region. Its optional.
        // A Geocoding request with region=es (Spain) will return the Spanish city.
        Geocode.setRegion("es");

        // set location_type filter . Its optional.
        // google geocoder returns more that one address for given lat/lng.
        // In some case we need one address as response for which google itself provides a location_type filter.
        // So we can easily parse the result for fetching address components
        // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
        // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
        Geocode.setLocationType("ROOFTOP");

        // Enable or disable logs. Its optional.
        Geocode.enableDebug();

        // Get address from latitude & longitude.
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


    //logout user

    const onlogout = () => {
        logoutUser();
        navigate("/");
    }

    return (
        <div>

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

             {user &&  <FaBars className="usersbarsicon" onClick={() => {
                    setscroll('hidden')
                    setdisplaysidenav(true)
                }} />}

                <img src={require('./../../assets/homelogo.jpg')} className="usershomelogo" />
                <div className="userslocation" style={{ opacity: opacity }}>
                    <FaMapMarker className="userslocationicon" />
                    <p>{useraddress.substring(10, 31)}</p>
                </div>
                <div className="foodheadersearchwrap" style={{ opacity: opacity }}>
                    <input type="text" className="foodheadersearchinput" />
                    <FaSearch className="searchicon" />
                </div>
                <div className="wrapcart" style={{ opacity: opacity }}  onClick={user?()=>navigate("/mycart"):()=>navigate("/login")}>
                    <FaShoppingCart className="userslocationicon" />
                    <p> {cartno ? cartno : "0"}  Cart</p>
                </div>
            </div>

            <div className="foodsandheaderwrap" style={{ opacity: opacity }}>
                <div class="scrollmenu" style={{ backgroundColor: "white", marginBottom: 10 }}>
                    <div className="iconfoods"><img src={require('./../../assets/icon1.png')} /><br />Deals</div>
                    <div className="iconfoods"><img src={require('./../../assets/icon2.png')} /><br />Convenience</div>
                    <div className="iconfoods"><img src={require('./../../assets/icon3.png')} /><br />Alcohol</div>
                    <div className="iconfoods"><img src={require('./../../assets/icon4.png')} /><br />Pharmacy</div>
                    <div className="iconfoods"><img src={require('./../../assets/icon5.png')} /><br />Flowers</div>
                    <div className="iconfoods"><img src={require('./../../assets/icon6.png')} /><br />Highest<br /> rated</div>
                    <div className="iconfoods"><img src={require('./../../assets/icon7.png')} /><br />Pizza</div>
                    <div className="iconfoods"><img src={require('./../../assets/icon8.png')} /><br />Mexican</div>
                    <div className="iconfoods"><img src={require('./../../assets/icon9.png')} /><br />Italian</div>
                    <div className="iconfoods"><img src={require('./../../assets/icon10.png')} /><br />Sandwich</div>
                    <div className="iconfoods"><img src={require('./../../assets/icon11.png')} /><br />Healthy</div>
                    <div className="iconfoods"><img src={require('./../../assets/icon12.png')} /><br />Coffee and<br /> Tea</div>
                    <div className="iconfoods"><img src={require('./../../assets/icon13.png')} /><br />Burgers</div>
                </div>
                <hr />
                <div className="foodsheader" style={{ marginTop: 20 }}>
                    Nearby Restaurants   <button onClick={viewallrestaurants} className="viewallbutton">View all</button>
                </div>
                <div class="scrollmenu">
                    {restaurants.map((val, key) => {
                        const kms = calcCrow(val.latitude, val.longitude, latitude, longitude);
                        return (
                            kms < 30 && <div className="scrolldiv" key={key}>
                                <img src={val.branchImg} /><br />

                                <div className="foodrestaurant">{val.restaurant}</div><br />
                                <div style={{ display: "contents", }} ><FaMapMarker color="#ff9334" /> {val.branchAddress.substring(0, 25)}...</div><br />
                                <div style={{ fontSize: 10, fontFamily: "cursive" }}> ({calcCrow(val.latitude, val.longitude, latitude, longitude)}km away)</div>
                                {/* <div className="fooddeliveryprice">{val.restCategories[0]}</div>*/}
                            </div>
                        )
                    })}

                    ...
                </div>
            </div>

            <div className="foodsandheaderwrap" style={{ opacity: opacity }}>


                <div className="foodsheader">
                    Popular Menus
                </div>
                {display ?
                    <div className="foodswrap">
                        {menu.map((val, key) => {

                            const rating = (val.rating / val.numberOfRatings).toFixed(1);

                            const Stars = () => {

                                if (rating > 4) {
                                    return <div style={{display:"flex"}}>
                                        <FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="#ff9334" />
                                    </div>
                                }
                                if (rating > 3.9 && rating < 5) {
                                    return<div style={{display:"flex"}}>
                                        <FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="gray" />
                                    </div>
                                }
                                if (rating > 2.9 && rating < 4) {
                                    return<div style={{display:"flex"}}>
                                        <FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="gray" /><FaStar color="gray" />
                                    </div>
                                }
                                if (rating > 1.9 && rating < 3) {
                                    return <div style={{display:"flex"}}>
                                        <FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" />
                                    </div>
                                }
                                if (rating > 0.9 && rating < 2) {
                                    return <div style={{display:"flex"}}>
                                        <FaStar color="#ff9334" /><FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" />
                                    </div>
                                }
                                if (rating < 0.9) {
                                    return <div style={{display:"flex"}}>
                                        <FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" />
                                    </div>
                                }
                            }


                            return (
                                <div className="foods" key={key} onClick={() => {
                                    setRestaurantSessionName(val)
                                    navigate("/viewmenumeal")
                                }}>
                                    {/*<FaHeart className="likeicon" />*/}
                                    <img src={val.mealImage} /><br />
                                    <div className="foodcontentdetails">
                                        <div className="foodrestaurant">{val.menuName.substring(0, 10)}</div>
                                        <div className="stars" style={{display:"flex"}}>{rating > 0 ? <Stars /> :
                                            <div>
                                                <FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" />
                                            </div>
                                        }</div>
                                        <div className="rating">{rating > 0 ? rating : 0 + '.' + 0}</div>
                                    </div>
                                    <div className="fooddeliveryprice"><FaUtensils color="#ff9334" size={10} />{val.menuCategories[0]}</div>
                                </div>
                            )
                        })}

                    </div>
                    : <div style={{ marginLeft: "40%" }}><ReactLoading type={type} color={color} height={200} width={100} /></div>}
            </div>

            <div className="foodsandheaderwrap" style={{ opacity: opacity }}>
                <div className="foodsheader" id="restaurants">
                    All restaurants
                </div>
                {display ?
                    <div className="foodswrap">
                        {restaurants.map((val, key) => {

                            return (
                                <div className="foods" key={key}>
                                    <img src={val.branchImg} /><br />
                                    <div className="foodrestaurant">{val.branch}</div>
                                    <div style={{ marginBottom: 2 }} ><FaMapMarker color="#ff9334" /> {val.branchAddress.substring(0, 60)}...</div>
                                    <div style={{ fontSize: 10, fontFamily: "cursive" }}> ({calcCrow(val.latitude, val.longitude, latitude, longitude)}km away)</div>
                                    {/* <div className="fooddeliveryprice">{val.restCategories[0]}</div>*/}
                                </div>
                            )
                        })}

                    </div> : <div style={{ marginLeft: "40%" }}><ReactLoading type={type} color={color} height={200} width={100} /></div>}
            </div>



        </div>
    )
}

export default Fetchfoods;