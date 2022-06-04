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
import { collection, getDocs, query, where } from "@firebase/firestore"
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
                    Nearby Restaurants
                </div>
                <div class="scrollmenu">
                    {restaurants.map((val, key) => {

                        return (
                            <div className="scrolldiv" key={key}>
                                <img src={val.branchImg} /><br />

                                <div className="foodrestaurant">{val.restaurant}</div><br />

                                <div style={{ display: "contents", }} ><FaMapMarker color="#ff9334" /> {val.branchAddress.substring(0, 25)}...</div>
                                {/* <div className="fooddeliveryprice">{val.restCategories[0]}</div>*/}
                            </div>
                        )
                    })}

                    ...
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
                    All restaurants
                </div>
                {display ?
                    <div className="foodswrap">
                        {restaurants.map((val, key) => {

                            return (
                                <div className="foods" key={key}>
                                    <img src={val.branchImg} /><br />
                                    <div className="foodrestaurant">{val.restaurant}</div>
                                    <div style={{ marginBottom: 30 }} ><FaMapMarker color="#ff9334" /> {val.branchAddress.substring(0, 60)}...</div>
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