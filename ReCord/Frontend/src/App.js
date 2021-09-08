import React, { useEffect } from 'react'
import Login from "./Components/Login";
import Chat from "./Components/Chat/Chat";
import { useSelector, useDispatch } from 'react-redux';
import { SetViewPointTrue, SetViewPointFalse } from '../src/Redux/Action/action'


function App() {

  const dispatch = useDispatch();
  const StoreData = useSelector((state) => state.Auth_state);

  useEffect(() => {
    window.addEventListener("resize", changeViewPoint);
    changeViewPoint();
    
    return () => {
      window.removeEventListener("resize", console.log('Event Removed'));
    }
    // eslint-disable-next-line
  }, [window])

  function changeViewPoint(){
    let width = window.innerWidth;
    if (width > 900) {
      dispatch(SetViewPointFalse());
    }
    else {
      dispatch(SetViewPointTrue());
    }
  }

  return (
    <div className="App">

      { StoreData ? ( <Chat/> ) : (
        <Login/>
      ) }

    </div>
  );
}

export default App;
