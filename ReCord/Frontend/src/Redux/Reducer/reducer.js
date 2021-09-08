export const loadUser = () => {
    try {
      const UserData = localStorage.getItem('Auth_state');
      if (UserData === null) {
        return null;
      }
      else{
        return JSON.parse(UserData);
      }
    } catch (err) {
        return undefined;
    }
}; 

export const getViewPoint = () => {
  try {
    let isMobile;
    const viewPoint = window.innerWidth;
    if (viewPoint > 800) {
        isMobile = false
      return isMobile;
    }
    else{
      isMobile = true
      return isMobile;
    }
  } catch (err) {
      return undefined;
  }
}; 

 
const intialState = {
    Auth_state : loadUser(),
    ViewPointMobile : getViewPoint() ,
    isSideBar : true
};


const UserDataCookie = (state = intialState, action) => {
    switch(action.type){
        case 'Remove_User':
            return{
              ...state,
                Auth_state: action.Auth_state
            }
        case 'Add_User':
          return{
            ...state,
              Auth_state: action.Auth_state
          }
        case 'ViewPointMobileTrue':
          return{
            ...state,
              ViewPointMobile : true
          }
        case 'ViewPointMobileFalse':
          return{
            ...state,
              ViewPointMobile : false
          }
          case 'isSideBarToggle':
            return{
              ...state,
              isSideBar : !state.isSideBar
            }
        default:
            return state;
    }
} 

export default UserDataCookie;