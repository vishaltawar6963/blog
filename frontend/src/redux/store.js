import { } from "react-redux"
import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { authReducer } from "./reducer/authReducer"
import { blogReducer } from "./reducer/blogReducer."
import { userReducer } from "./reducer/userReducer"

const rootReducer = combineReducers({
    auth: authReducer,
    blog: blogReducer,
    user: userReducer
})

const localData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null

const initialValues = {
    auth: {
        login: localData
    }

}

const store = createStore(
    rootReducer,
    initialValues,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store