import { GET_ALL_USER_FAIL, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS } from "../constant/userConstant"
import axios from "axios"

export const allUserAction = () => async dispatch => {
    try {
        dispatch({ type: GET_ALL_USER_REQUEST })
        const { data: { result } } = await axios.get(`http://localhost:5000/api/user`)
        dispatch({ type: GET_ALL_USER_SUCCESS, payload: result })
    } catch (error) {

        dispatch({ type: GET_ALL_USER_FAIL, payload: error.message })
    }
}