export const Add_User =  () => {
    const deserialize_user = localStorage.getItem('Auth_state');
    return{
        type: 'Add_User',
        Auth_state: JSON.parse(deserialize_user)
    }
}


export const Remove_User =  () => {
    return{
        type: 'Remove_User',
        Auth_state: null
    }
}

export const SetViewPointTrue =  () => {
    return{
        type: 'ViewPointMobileTrue'
    }
}

export const SetViewPointFalse =  () => {
    return{
        type: 'ViewPointMobileFalse'
    }
}

export const sideBarToggle =  () => {
    return{
        type: 'isSideBarToggle'
    }
}