import { createStore } from 'redux'

import UserDataCookie from '../Reducer/reducer'

const store = createStore(UserDataCookie, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;