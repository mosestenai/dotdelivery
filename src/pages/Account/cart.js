import { useLocation, useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import {
    FaBars, FaTimes, FaShoppingCart, FaUser, FaAndroid, FaTrash,
    FaFile, FaSignOutAlt, FaLocationArrow, FaClock, FaQuestionCircle, FaFacebookMessenger, FaIdCard, FaPlusCircle,
    FaStar, FaUtensils, FaMinusSquare, FaPlusSquare, FaUserCheck
} from 'react-icons/fa';
import { db } from "./../../firebase-config";
import ReactLoading from 'react-loading';
import { getLocalStorageUser, logoutUser, getBranchSessiondetails, getcartSessionno, setcartSession, getcartSession, setcartSessionno } from "./../Utils/common";
import { collection, addDoc, setDoc, doc } from "@firebase/firestore"
import Geocode from "react-geocode";
import Select from 'react-select';
import "./../../css/branch.css";
import Countdown from 'react-countdown';
import { async } from "@firebase/util";



let color = "#ff9334";
let type = "spokes";



const Mycart = () => {
    const cartitems = getcartSession();
    const branch = getBranchSessiondetails();
    const cartno = getcartSessionno();
    const user = getLocalStorageUser();


    useEffect(() => {
        getsum(cartitems ? cartitems : []);
        getlocation();
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
    const [addresses, setaddresses] = useState([]);
    const [deliveryaddress, setdeliveryaddress] = useState('');



    const getaddress = (long, lat) => {
        Geocode.setApiKey(process.env.REACT_APP_MAP_API_KEY);
        Geocode.setLanguage("en");
        Geocode.setRegion("es");
        Geocode.setLocationType("APPROXIMATE");
        Geocode.enableDebug();
        Geocode.fromLatLng(lat, long).then(
            (response) => {

                response.results.forEach(myFunction);
                function myFunction(item) {
                    var gh = {
                        label: item.formatted_address,
                        value: item.formatted_address
                    }
                    addresses.push(gh)
                }
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
                getaddress(position.coords.longitude, position.coords.latitude);
            },
            function (error) {
                alert(error.message + ". PLease allow location to continue");
            }
        );

    }



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

    //get cart sum to one order
    const getsubsum = (e) => {
        const gh = [];
        for (const element of e) { // You can use `let` instead of `const` if you like
            gh.push(parseInt(element.itemprice))
        }
        let sum = 0;
        for (let i = 0; i < gh.length; i++) {
            sum += gh[i];
        }
        return sum;
    }



    const update = () => {
        if (test.length < 5) {
            settest("ggggggg")
        } else {
            settest('')
        }

    }

   


    //complete cart 
    const checkoutcart = async () => {
        seterror(null)
        var currentdate = new Date();

        if (!deliveryaddress) {
            seterror("Choose a delivery address")
        } else {
            setloading(true)
            const insertfoodorderref = collection(db, "orders");
            var countList = cartitems.reduce(function (p, c) {
                p[c.restaurant] = (p[c.restaurant] || 0) + 1;
                return p;
            }, {});

            var result = cartitems.filter(function (obj) {
                return countList[obj.restaurant] > 1;
            });
            var result2 = cartitems.filter(function (obj) {
                return countList[obj.restaurant] < 2;
            });
           
           

            if (result.length > 1) {
                const total = getsubsum(result);
                try {
                    const add = await addDoc(insertfoodorderref, {
                        branch: result[0].branch,
                        branchAddress: result[0].branchAddress,
                        branchEmail: result[0].branchEmail,
                        branchId: result[0].branchId,
                        branchImg: result[0].branchImg,
                        branchLat: result[0].branchLat,
                        branchLng: result[0].branchLng,
                        branchManager: result[0].branchManager,
                        branchPhone: result[0].branchPhone,
                        restaurant: result[0].restaurant,
                        restId: result[0].restaurantId,
                        deliveryAddress: deliveryaddress,
                        deliveryPhone: user.phoneNumber,
                        displayName: user.displayName,
                        deliveryType: "instant",
                        email: user.email,
                        timestamp: currentdate,
                        uid: user.unid,
                        userPhone: user.phoneNumber,
                        fromMenu: result[0].menu,
                        fromMenuId: result[0].menuId,
                        total: total,
                        subtotal: total
                    });

                    if (add) { 
                        const myFunction = async (item) => {
                            const itemsref = collection(db, "orders", add._key.path.segments[1], "items");
                            try {
                                const add2 = await setDoc(doc(itemsref), {
                                    branch: item.branch,
                                    branchId: item.branchId,
                                    restaurant: item.restaurant,
                                    restId: item.restaurantId,
                                    type: "delivery",
                                    email: user.email,
                                    fromApp: "Dot delivery",
                                    timestamp: currentdate,
                                    uid: user.unid,
                                    userPhone: user.phoneNumber,
                                    mealPrice: item.itemprice / item.itemquantity,
                                    mealTotal: item.itemprice,
                                    mealName: item.itemname,
                                    mealImage: item.itemimg,
                                    mealId: item.id,
                                    mealDesc: item.itemdescription,
                                    quantity: item.itemquantity,
                                    menuName: item.menu,
                                    menuId: item.menuId,
                                });
                                if (!add2) {
                                    seterror("added succesfully")
                                    setloading(false)
                                } else {
                                    setloading(false)
                                    seterror("error encountered")
                                }
                            } catch (error) {
                                setloading(false)
                                seterror(error.message)
                            }

                        }
                        result.forEach(myFunction);
                    } else {
                        seterror("there was an error try again later")
                    }
                } catch (error) {
                    seterror(error.message)
                }
            } 

            //adding one item  to cart
            if (result2.length === 1) {
                try {
                    const add = await addDoc(insertfoodorderref, {
                        branch: result2[0].branch,
                        branchAddress: result2[0].branchAddress,
                        branchEmail: result2[0].branchEmail,
                        branchId:result2[0].branchId,
                        branchImg: result2[0].branchImg,
                        branchLat: result2[0].branchLat,
                        branchLng: result2[0].branchLng,
                        branchManager: result2[0].branchManager,
                        branchPhone: result2[0].branchPhone,
                        restaurant:result2[0].restaurant,
                        restId: result2[0].restaurantId,
                        deliveryAddress: deliveryaddress,
                        deliveryPhone: user.phoneNumber,
                        displayName: user.displayName,
                        deliveryType: "instant",
                        email: user.email,
                        timestamp: currentdate,
                        uid: user.unid,
                        userPhone: user.phoneNumber,
                        fromMenu: result2[0].menu,
                        fromMenuId: result2[0].menuId,
                        total: result2[0].itemprice,
                        subtotal: result2[0].itemprice,
                    });

                    if (add) { 
                            const itemsref = collection(db, "orders", add._key.path.segments[1], "items");
                            try {
                                const add2 = await setDoc(doc(itemsref), {
                                    branch: result2[0].branch,
                                    branchId: result2[0].branchId,
                                    restaurant: result2[0].restaurant,
                                    restId: result2[0].restaurantId,
                                    type: "delivery",
                                    email: user.email,
                                    fromApp: "Dot delivery",
                                    timestamp: currentdate,
                                    uid: user.unid,
                                    userPhone: user.phoneNumber,
                                    mealPrice: result2[0].itemprice,
                                    mealTotal: result2[0].itemprice,
                                    mealName: result2[0].itemname,
                                    mealImage: result2[0].itemimg,
                                    mealId: result2[0].id,
                                    mealDesc: result2[0].itemdescription,
                                    quantity: result2[0].itemquantity,
                                    menuName: result2[0].menu,
                                    menuId: result2[0].menuId,
                                });
                                if (!add2) {
                                    seterror("added succesfully")
                                    setloading(false)
                                } else {
                                    setloading(false)
                                    seterror("error encountered")
                                }
                            } catch (error) {
                                setloading(false)
                                seterror(error.message)
                            }

                       
                    } else {
                        seterror("there was an error try again later")
                    }
                } catch (error) {
                    seterror(error.message)
                }
            } 




        }

    }


    //logout user 
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

            <div className="foodsandheaderwrap" style={{ opacity: opacity, paddingBottom: 350 }}>

                <div className="cartsummarydiv">
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
                    Delivery address
                    <Select menuPlacement="top" options={addresses} defaultValue={addresses[0]} onChange={e => setdeliveryaddress(e.value)} />
                    {loading && <ReactLoading type={type} color={color} height={50} width={50} />}
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <br />
                    <button className="checkoutbutton" onClick={checkoutcart}>CHECKOUT BWP {cartsum}</button>
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
                <div className="cartsummarydivphone">
                    <br />
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
                    <button className="checkoutbutton" onClick={checkoutcart}>CHECKOUT BWP {cartsum}</button>
                    <br />
                </div>

            </div>
        </div>
    )
}

export default Mycart;