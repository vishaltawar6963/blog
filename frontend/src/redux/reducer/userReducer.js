import { GET_ALL_USER_FAIL, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS } from "../constant/userConstant"

export const userReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case GET_ALL_USER_REQUEST: return {
            ...state,
            loading: true,
        }
        case GET_ALL_USER_SUCCESS: return {
            ...state,
            loading: false,
            allUser: payload
        }
        case GET_ALL_USER_FAIL: return {
            ...state,
            loading: false,
            error: payload
        }
        default: return state
    }
}