import { baseUrl } from "../../url"
import { ADD_BLOG_FAIL, ADD_BLOG_REQUEST, ADD_BLOG_SUCCESS, DELETE_BLOG_FAIL, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, GET_ALL_BLOGS_FAIL, GET_ALL_BLOGS_REQUEST, GET_ALL_BLOGS_SUCCESS, GET_SINGLE_BLOGS_FAIL, GET_SINGLE_BLOGS_REQUEST, GET_SINGLE_BLOGS_SUCCESS, GET_USER_BLOG_FAIL, GET_USER_BLOG_REQUEST, GET_USER_BLOG_SUCCESS, UPDATE_BLOG_FAIL, UPDATE_BLOG_REQUEST, UPDATE_BLOG_SUCCESS, UPDATE_PUBLISH_BLOG_FAIL, UPDATE_PUBLISH_BLOG_REQUEST, UPDATE_PUBLISH_BLOG_SUCCESS } from "../constant/blogConstant"
import axios from "axios"

export const getAllBlogAction = () => async dispatch => {
    try {
        dispatch({ type: GET_ALL_BLOGS_REQUEST })
        const { data } = await axios.get(`${baseUrl}5000/api/blog`)
        console.log(data.result );
        dispatch({ type: GET_ALL_BLOGS_SUCCESS, payload: data.result })
    } catch (error) {

        dispatch({ type: GET_ALL_BLOGS_FAIL, payload: error.message })
    }
}
export const getSingleBlogAction = (id) => async dispatch => {
    try {
        dispatch({ type: GET_SINGLE_BLOGS_REQUEST })
        const { data } = await axios.get(`${baseUrl}5000/api/blog/${id}`)
        dispatch({ type: GET_SINGLE_BLOGS_SUCCESS, payload: data.result })
    } catch (error) {

        dispatch({ type: GET_SINGLE_BLOGS_FAIL, payload: error.message })
    }
}
export const getUserBlogAction = (id) => async dispatch => {
    try {
        dispatch({ type: GET_USER_BLOG_REQUEST })
        const { data } = await axios.get(`${baseUrl}5000/api/blog/user/${id}`)
        dispatch({ type: GET_USER_BLOG_SUCCESS, payload: data.result })
    } catch (error) {

        dispatch({ type: GET_USER_BLOG_FAIL, payload: error.message })
    }
}
export const addBlogAction = blogData => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_BLOG_REQUEST })
        const token = getState().auth.login.token
        console.log("hii");
        const config = {
            headers: {
                authorization: token
            }
        }
        console.log("after");
        const { data } = await axios.post(`${baseUrl}5000/api/blog`, blogData, config)
        dispatch({ type: ADD_BLOG_SUCCESS, payload: data })
    } catch (error) {

        dispatch({ type: ADD_BLOG_FAIL, payload: error.message })
    }
}
export const updateBlogAction = (blogData, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_BLOG_REQUEST })

        const token = getState().auth.login.token
        const config = {
            headers: {
                authorization: token
            }
        }
        console.log(blogData);
        const { data } = await axios.put(`${baseUrl}5000/api/blog/${id}`, { publish: blogData }, config)
        dispatch({ type: UPDATE_BLOG_SUCCESS, payload: data })
    } catch (error) {

        dispatch({ type: UPDATE_BLOG_FAIL, payload: error.message })
    }
}

export const deleteBlogAction = id => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_BLOG_REQUEST })
        const token = getState().auth.login.token
        const config = {
            headers: {
                authorization: token
            }
        }
        console.log(id);
        const { data } = await axios.delete(`${baseUrl}5000/api/blog/${id}`, config)
        dispatch({ type: DELETE_BLOG_SUCCESS })
    } catch (error) {

        dispatch({ type: DELETE_BLOG_FAIL, payload: error.message })
    }
}