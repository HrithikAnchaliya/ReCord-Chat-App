import React, { useEffect, useState } from 'react'
import BackgroundVideo from './BackgroundVideo'
import LoginWithGoogle from './LoginWithGoogle'
import '../Style/Login.css'
import SVGBackground from './Chat/AnimatedBG';

function Login() {

    let values = ["The Discord Ripoff", "Not An Ordinary Chat App", "You Can Throw Away Your Whatsapp Now",]
    let random = Math.floor(Math.random() * values.length);
    const [svgToggle, setSvgToggle] = useState(true)

    useEffect(() => {
        window.addEventListener("resize", changeViewPoint);
        changeViewPoint();

        return () => {
          window.removeEventListener("resize", changeViewPoint);
        }
        // eslint-disable-next-line
    }, [window])

    function changeViewPoint(){
        let width = window.innerWidth;
        if(width < 1200){
            setSvgToggle(true)
        } else {
            setSvgToggle(false);
        }
    }

    return (
        <div>
            {svgToggle ? 
            <SVGBackground/> : <BackgroundVideo/>}
            <div id="login-div">
                <div id="login-inner-div">
                <h1>Re-Cord</h1>
                <p>{values[random]}</p>
                    <LoginWithGoogle/>
                </div>
            </div>
        </div>
    )
}

export default Login