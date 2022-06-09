import { useLocation, useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import {
    FaBars, FaTimes, FaShoppingCart, FaUser, FaAndroid, FaTrash,
    FaFile, FaSignOutAlt, FaLocationArrow, FaClock, FaQuestionCircle, FaFacebookMessenger, FaIdCard, FaPlusCircle,
    FaStar, FaUtensils, FaMinusSquare, FaPlusSquare, FaUserCheck
} from 'react-icons/fa';
import { db } from "./../../firebase-config";
import SlidingPanel from 'react-sliding-side-panel';
import ReactLoading from 'react-loading';
import { getLocalStorageUser, logoutUser, getBranchSessiondetails, getcartSessionno, setcartSession, getcartSession, setcartSessionno } from "./../Utils/common";
import { collection, getDocs, query, where, orderBy, startAt, endAt } from "@firebase/firestore"
import Geocode from "react-geocode";
import "./../../css/branch.css";
import Countdown from 'react-countdown';


let color = "#ff9334";
let type = "spinningBubbles";



const Mycart = () => {
    const cartitems = getcartSession();
    const branch = getBranchSessiondetails();
    const cartno = getcartSessionno();
    const user = getLocalStorageUser();

    useEffect(() => {
        getsum(cartitems);
    }, [])

    const navigate = useNavigate();

    if (!user) {
        navigate("/")
    }


    const [loading, setloading] = useState(false);
    const [error, seterror] = useState('');

    const [displaysidenav, setdisplaysidenav] = useState(false);
    const [scroll, setscroll] = useState('auto');

    const [showlogout, setshowlogout] = useState(false);
    const [opacity, setopacity] = useState(1);
    const [cartsum, setcartsum] = useState('');
    const [test, settest] = useState('');

    const getsum = (e) => {

        const gh = [];
        for (const element of e) { // You can use `let` instead of `const` if you like
            gh.push(parseInt(element.itemprice))
        }

        let sum = 0;
        for (let i = 0; i < gh.length; i++) {
            sum += gh[i];
        }
        setcartsum(sum)
    }

    // //
    // const getsum2 = (e) => {

    //     const gh = [];
    //     for (const element of e) { // You can use `let` instead of `const` if you like
    //         gh.push(parseInt(element.itemprice))
    //     }

    //     let sum = 0;
    //     for (let i = 0; i < gh.length; i++) {
    //         sum += gh[i];
    //     }
    //     setcartsum(sum)
    // }



    const update = () => {
        if (test.length < 5) {
            settest("ggggggg")
        } else {
            settest('')
        }

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
                <div className="carticonno" id="cartdiv" style={{ opacity: opacity, cursor: "pointer" }}
                    onClick={() => navigate("/mycart")}>
                    <FaShoppingCart /> {cartno ? cartno : "0"} . Cart
                </div>
            </div>

            <div className="foodsandheaderwrap" style={{ opacity: opacity, paddingBottom: 300 }}>

                <div className="branchbodyprofiletime">
                    <div className="foodsheader" >
                        Cart Summary
                    </div>
                    <br />
                    <hr style={{ fontSize: 0.5 }} color="#d3d1cd" /><br />
                    <div style={{ display: "flex" }}>
                        <div>Subtotal </div> <div className="cartsumno">Bwp {cartsum}</div>
                    </div>
                    <br />
                    <hr style={{ fontSize: 0.5 }} color="#d3d1cd" />
                    <br />
                    <FaUserCheck size={20} color="#ff9334" style={{ marginRight: 5 }} /> Dot Delivery<br /><br />
                    <br />
                    <button className="checkoutbutton">CHECKOUT BWP {cartsum}</button>

                    <br />


                </div>

                <div className="branchbody">
                    <div className="foodsheader" >
                        Cart({cartno})
                    </div>
                    <hr style={{ fontSize: 0.5 }} color="#d3d1cd" />
                    {cartitems ? cartitems.map((val, key) => {

                        //add quantity of an item in cart
                        const addquantity = () => {
                            var index = cartitems.findIndex(obj => obj?.id == val.id);
                            const price = parseInt(val.itemprice) / parseInt(val.itemquantity);
                            cartitems[index].itemprice = parseInt(val.itemprice) + price;

                            const gh = val.itemquantity + 1;
                            cartitems[index].itemquantity = gh;
                            setcartSession(cartitems);
                            update();
                            getsum(cartitems);
                        }

                        //reduce quantity of an item in cart
                        const Reducequantity = () => {
                            var index = cartitems.findIndex(obj => obj?.id == val.id);
                            const price = parseInt(val.itemprice) / parseInt(val.itemquantity);
                            cartitems[index].itemprice = parseInt(val.itemprice) - price;
                            const gh = val.itemquantity - 1;

                            cartitems[index].itemquantity = gh;
                            setcartSession(cartitems);
                            update();
                            getsum(cartitems);
                        }


                        //remove item from cart
                        const removeitem = () => {
                            var index = cartitems.findIndex(obj => obj?.id == val.id);
                            delete cartitems[index];
                            const results = cartitems.filter(element => {
                                return element !== null;
                            });
                            setcartSession(results)
                            setcartSessionno(parseInt(cartno) - 1);
                            update();
                            getsum(results);

                        }

                        return (
                            <div key={key} >
                                <div className="cartitemdiv">
                                    <img src={val.itemimg} className="cartitemimage" />
                                    <div className="itemcartcontent">
                                        <div style={{ fontWeight: "bold", fontFamily: "monospace", fontSize: 20 }}>{val.itemname}</div>
                                        <div style={{ fontFamily: "monospace" }}>{val.itemdescription}</div>
                                        <div style={{ fontFamily: "monospace" }}>In stock</div>
                                    </div>
                                    <div className="cartitemprice">
                                        Bwp &nbsp;{val.itemprice}<br />
                                        <div style={{ fontWeight: "normal", color: "gray" }}><strike>Bwp{parseInt(val.itemprice) + 60}</strike></div>
                                    </div>
                                </div>
                                <br />
                                <div className="bottomcartdiv">
                                    <button onClick={removeitem}><FaTrash /> DELETE</button>
                                    <div className="bottomcartbuttons">
                                        <FaMinusSquare color="#ff9334" style={{ cursor: "pointer", opacity: 0.5 }} onClick={val.itemquantity > 1 ? Reducequantity : ""} />
                                        <div className="cartcardquantity">{val.itemquantity}</div>
                                        <FaPlusSquare style={{ cursor: "pointer" }} color="#ff9334" onClick={addquantity} />
                                    </div>
                                </div>
                                <br />
                                <hr style={{ fontSize: 0.5 }} color="#d3d1cd" />
                            </div>
                        )
                    }) :
                        <div>You dont have any items in cart at the moment</div>
                    }


                </div>




            </div>

            {error && < h5 align="middle" style={{ color: "red" }}>{error}</h5>}
            {loading && <div style={{ marginLeft: "40%" }}><ReactLoading type={type} color={color} height={200} width={100} /></div>}

        </div>
    )
}

export default Mycart;