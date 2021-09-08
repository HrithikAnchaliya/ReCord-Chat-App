import React from 'react'
import SVGBackground from './AnimatedBG';
import ChatBar from './ChatBar';
import Sidebar from './Sidebar';
import { Switch, Route} from 'react-router-dom';
import '../../Style/Chat.css'
import AddServer from '../Add Server/AddServer';
import Intro from '../Intro';

function Chat(props) {
    return (
        <div>
            <SVGBackground/>
            <div id="chat-div">
                <div id="chat-inner-div">

                    <Sidebar/>

                    <Switch>
                        <Route path="/" exact component={Intro}/>
                        <Route path='/addserver' exact component={AddServer}/>
                        <Route path='/:RoomID' exact component={ChatBar}/>
                    </Switch>

                </div>
            </div>
        </div> 
    )
}


export default Chat