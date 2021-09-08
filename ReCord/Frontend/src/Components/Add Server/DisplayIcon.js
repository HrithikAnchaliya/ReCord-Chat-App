import React, { useState, useEffect } from 'react'
import axios from 'axios';
import SVG from 'react-inlinesvg';
import '../../Style/Icons.css'

function DisplayIcon(props){

    const[svgData, setSvgData] = useState('')

    useEffect(() => {
        async function getSVG(){
            try {
                const {  data  } = await axios.get(`https://api-icons.icons8.com/publicApi/icons/icon?id=${props.icon.id}&token=${process.env.REACT_APP_ICONS8_API}`);
                setSvgData(data.icon)
            } catch (e) {
                console.log(e);
            }
        }
        getSVG()
        return(() => {
            setSvgData('');
        })
         // eslint-disable-next-line
    },[props])

    function handleclick(){
        props.handleclick(svgData.svg)
    }

    return (
        <div id="icon-element">
            <SVG onClick={handleclick} src={svgData.svg} width={45} />
        </div>
    )
}

export default DisplayIcon
