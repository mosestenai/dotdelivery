import React from "react";
import "./../../css/footer.css";

const Footer = () => {

    return (
        <div className="footer">
            <div className="footerheader">
                <img src={require('./../../assets/footerlogo.jpg')} width={100} height={100} />
                <div className="subscribediv">
                    <p style={{color:"white",fontSize:20,fontWeight:"bold"}}>NEW TO DOTDELIVERY?</p>
                    <p style={{color:"white",fontSize:15}}>Subscribe to our newsletter to get updates on our latest offers!</p>
                    <div className="subscribeinputdiv">
                        <input type="email" className="subscribeinput"/>
                        <button className="subscribebutton">subscribe</button>
                    </div>
                </div>
            </div>
            <div className="wraplinksdiv">
                <div className="linkdiv">
                    <p style={{color:"silver",fontWeight:"bold"}}>COMPANY</p>
                    <a >About us</a>
                    <a >Team</a>
                    <a >Careers</a>
                    <a>Dotdelivery blog</a>
                </div>
                <div className="linkdiv">
                    <p style={{color:"silver",fontWeight:"bold"}}>CONTACT</p>
                    <a >Help & support</a>
                    <a >Partner with us</a>
                    <a >Ride with us</a>
                </div>
                <div className="linkdiv">
                    <p style={{color:"silver",fontWeight:"bold"}}>LEGAL</p>
                    <a >Terms & Conditions</a>
                    <a >Refunds & cancellations</a>
                    <a >Privacy Policy</a>
                    <a>Cookie policy</a>
                    <a>Offer Terms</a>
                    <a>Phishing & Fraud</a>
                </div>
            </div>
            <div className="copyright">
            
                &copy; 2022 DOTDELIVERY.COM</div>
           
        </div>
    )

}

export default Footer;