import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constant/authConstant"
import { baseUrl } from "../../url"

export const userRegisterAction = (userData) => async dispatch => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const { data: { result } } = await axios.post(`${baseUrl}/api/auth/register`, userData)
        localStorage.setItem("user", JSON.stringify(result))
        dispatch({ type: USER_REGISTER_SUCCESS, payload: result })
    } catch (error) {

        dispatch({ type: USER_REGISTER_FAIL, payload: error.message })
    }
}
export const userLoginAction = (userData) => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const { data: { result } } = await axios.post(`${baseUrl}/api/auth/login`, userData)
        localStorage.setItem("user", JSON.stringify(result))
        dispatch({ type: USER_LOGIN_SUCCESS, payload: result })
    } catch (error) {

        dispatch({ type: USER_LOGIN_FAIL, payload: error.message })
    }
}
export const userLogOutAction = (userData) => async dispatch => {
    localStorage.removeItem("user")
    dispatch({ type: USER_LOGOUT })
}

// export const userUpdateAction = (fd, id) => async (dispatch, getState) => {
//     try {
//         dispatch({ type: USER_UPDATE_REQUEST })
//         const token = getState().auth.login.token
//         const config = {
//             headers: {
//                 authorization: token
//             }
//         }
//         console.log(fd);
//         const { data: { result } } = await axios.put(`http://localhost:5000/api/user/${id}`, fd, config)
//         localStorage.setItem("user", JSON.stringify(result))
//         dispatch({ type: USER_UPDATE_SUCCESS, payload: result })
//     } catch (error) {

//         dispatch({ type: USER_UPDATE_FAIL, payload: error.message })
//     }
// }