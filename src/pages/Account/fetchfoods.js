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
import { getSessionUser } from "./../Utils/common";
import { collection, getDocs,query,where } from "@firebase/firestore"
import { useNavigate } from "react-router-dom";


let color = "#ff9334";
let type = "spinningBubbles";


const Fetchfoods = () => {

    const user = getSessionUser();
    const navigate = useNavigate();
    const [display, setdisplay] = useState(false);

    const [displaysidenav, setdisplaysidenav] = useState(false);
    const [scroll, setscroll] = useState('auto');
    const [openPanel, setOpenPanel] = useState(true);


    const [restaurants, setrestaurants] = useState([]);
    const [menu, setmenu] = useState([]);

    document.body.style.overflow = scroll
    const [overlaystatus, setoverlaystatus] = useState(false);

    const restaurantscollectionRef = collection(db, "restaurants");
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
    }, [])


  


    return (
        <div>
            <div className="userheader">
                {displaysidenav &&
                    <div className="userssidemenu ">
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
                                <a href=""><FaUser className="link-icons" /> Profile details</a>
                                <a href=""><FaClock className="link-icons" />My Orders</a>
                                <a href=""><FaFacebookMessenger className="link-icons" />My chats</a>
                                <a href=""><FaIdCard className="link-icons" />Payment details</a>
                                <a href=""><FaLocationArrow className="link-icons" />Delivery Address</a>
                                <a href=""><FaAndroid className="link-icons" />Help</a>
                                <a href=""><FaQuestionCircle className="link-icons" />Frequently asked questions</a>
                                <a href=""><FaFile className="link-icons" />Terms of Service</a>
                                <a href=""><FaSignOutAlt className="link-icons" />Sign Out</a>
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
                <div className="userslocation">
                    <FaMapMarker className="userslocationicon" />
                    <p>Nairobi . Now</p>
                </div>
                <div className="foodheadersearchwrap">
                    <input type="text" className="foodheadersearchinput" />
                    <FaSearch className="searchicon" />
                </div>
                <div className="wrapcart">
                    <FaShoppingCart className="userslocationicon" />
                    <p>0 . Cart</p>
                </div>
            </div>


            <div className="foodsandheaderwrap">

                <div className="foodsheader">
                    Popular Menus
                </div>
                {display ?
                    <div className="foodswrap">
                        {menu.map((val, key) => {

                            const rating = (val.rating / val.numberOfRatings).toFixed(1);


                            const Stars = () => {

                                if (rating > 4) {
                                    return <div>
                                        <FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="#ff9334" />
                                    </div>
                                }
                                if (rating > 3.9 && rating < 5) {
                                    return <div>
                                        <FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="gray" />
                                    </div>
                                }
                                if (rating > 2.9 && rating < 4) {
                                    return <div>
                                        <FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="gray" /><FaStar color="gray" />
                                    </div>
                                }
                                if (rating > 1.9 && rating < 3) {
                                    return <div>
                                        <FaStar color="#ff9334" /><FaStar color="#ff9334" /><FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" />
                                    </div>
                                }
                                if (rating > 0.9 && rating < 2) {
                                    return <div>
                                        <FaStar color="#ff9334" /><FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" />
                                    </div>
                                }
                                if (rating < 0.9) {
                                    return <div>
                                        <FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" /><FaStar color="gray" />
                                    </div>
                                }
                            }


                            return (
                                <div className="foods" key={key}>
                                    <FaHeart className="likeicon" />
                                    <img src={val.mealImage} /><br />
                                    <div className="foodcontentdetails">
                                        <div className="foodrestaurant">{val.menuName.substring(0, 10)}</div>
                                        <div className="stars">{rating > 0 ? <Stars /> :
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

            <div className="foodsandheaderwrap">
                <div className="foodsheader">
                    Popular restaurants
                </div>
                {display ?
                    <div className="foodswrap">
                        {restaurants.map((val, key) => {

                            return (
                                <div className="foods" key={key}>
                                    <img src={val.restImg} /><br />
                                    <div className="foodcontentdetails">
                                        <p className="foodrestaurant">{val.restaurant.substring(0, 10)}</p>
                                    </div>
                                    <div style={{ marginTop: 5 }}> {val.restAddress.substring(0, 30)}...</div>
                                    <div className="fooddeliveryprice">{val.restCategories[0]}</div>
                                </div>
                            )
                        })}

                    </div> : <div style={{ marginLeft: "40%" }}><ReactLoading type={type} color={color} height={200} width={100} /></div>}
            </div>
            <div className="foodsandheaderwrap">
                <div className="foodsheader">
                    Popular near you
                </div>
                <div className="foodswrap">
                    <div className="foods">
                        <FaHeart className="likeicon" />
                        <img src={require("./../../assets/food1.jpg")} /><br />
                        <div className="foodcontentdetails">
                            <p className="foodrestaurant">ArostoInn</p>
                            <div className="rating">4.5</div>
                        </div>
                        <p className="fooddeliveryprice">ksh40 Fee . 10-30min</p>
                    </div>
                    <div className="foods">
                        <FaHeart className="likeicon" />
                        <img src={require("./../../assets/food2.jpg")} /><br />
                        <div className="foodcontentdetails">
                            <p className="foodrestaurant">Starbucks</p>
                            <div className="rating">4.5</div>
                        </div>
                        <p className="fooddeliveryprice">ksh80 Fee . 20-30min</p>
                    </div>
                    <div className="foods">
                        <FaHeart className="likeicon" />
                        <img src={require("./../../assets/food3.jpg")} /><br />
                        <div className="foodcontentdetails">
                            <p className="foodrestaurant">Iroko</p>
                            <div className="rating">4.5</div>
                        </div>
                        <p className="fooddeliveryprice">ksh40 Fee . 20-50min</p>
                    </div>
                    <div className="foods">
                        <FaHeart className="likeicon" />
                        <img src={require("./../../assets/food3.jpg")} /><br />
                        <div className="foodcontentdetails">
                            <p className="foodrestaurant">Spear</p>
                            <div className="rating">4.5</div>
                        </div>
                        <p className="fooddeliveryprice">ksh40 Fee . 20-50min</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Fetchfoods;