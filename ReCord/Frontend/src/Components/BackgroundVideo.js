import React from 'react'
// import texting from '../Stock Files/texting.mp4'
import '../Style/Login.css'

function BackgroundVideo() {
    return (
        <div>
            <video autoPlay muted loop id="BGVideo">
                <source src="https://res.cloudinary.com/dn4nfoyd4/video/upload/v1631085324/texting.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default BackgroundVideo
  