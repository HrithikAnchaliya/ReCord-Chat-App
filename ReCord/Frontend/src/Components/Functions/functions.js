export default function Serialize(storeUser){
    window.localStorage.setItem('Auth_state', JSON.stringify(storeUser))
}

export function DeSerialize(){
    window.localStorage.removeItem('Auth_state')
}
