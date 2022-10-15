import { ADD_BLOG_FAIL, ADD_BLOG_REQUEST, ADD_BLOG_SUCCESS, DELETE_BLOG_FAIL, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, GET_ALL_BLOGS_FAIL, GET_ALL_BLOGS_REQUEST, GET_ALL_BLOGS_SUCCESS, GET_SINGLE_BLOGS_FAIL, GET_SINGLE_BLOGS_REQUEST, GET_SINGLE_BLOGS_SUCCESS, GET_USER_BLOG_FAIL, GET_USER_BLOG_REQUEST, GET_USER_BLOG_SUCCESS, UPDATE_BLOG_FAIL, UPDATE_BLOG_REQUEST, UPDATE_BLOG_SUCCESS, UPDATE_PUBLISH_BLOG_FAIL, UPDATE_PUBLISH_BLOG_REQUEST, UPDATE_PUBLISH_BLOG_SUCCESS } from "../constant/blogConstant"



export const blogReducer = (state = { allBlogs: [] }, { type, payload }) => {
    switch (type) {
        case GET_ALL_BLOGS_REQUEST: return {
            ...state,
            loading: true,
        }
        case GET_ALL_BLOGS_SUCCESS: return {
            ...state,
            loading: false,
            allBlogs: payload
        }
        case GET_ALL_BLOGS_FAIL: return {
            ...state,
            loading: false,
            error: payload
        }
        case GET_SINGLE_BLOGS_REQUEST: return {
            ...state,
            loading: true,
        }
        case GET_SINGLE_BLOGS_SUCCESS: return {
            ...state,
            loading: false,
            singleBlog: payload
        }
        case GET_SINGLE_BLOGS_FAIL: return {
            ...state,
            loading: false,
            error: payload
        }
        case ADD_BLOG_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_BLOG_SUCCESS: return {
            ...state,
            loading: false,
            blogAdded: true
        }
        case ADD_BLOG_FAIL: return {
            ...state,
            loading: false,
            error: payload
        }
        case UPDATE_BLOG_REQUEST: return {
            ...state,
            loading: true,
        }
        case UPDATE_BLOG_SUCCESS: return {
            ...state,
            loading: false,
            blogUpdated: payload
        }
        case UPDATE_BLOG_FAIL: return {
            ...state,
            loading: false,
            error: payload
        }
        case DELETE_BLOG_REQUEST: return {
            ...state,
            loading: true,
        }
        case DELETE_BLOG_SUCCESS: return {
            ...state,
            loading: false,
            blogDeleted: true
        }
        case DELETE_BLOG_FAIL: return {
            ...state,
            loading: false,
        }
        case GET_USER_BLOG_REQUEST: return {
            loading: true
        }
        case GET_USER_BLOG_SUCCESS: return {
            loading: false,
            userBlogs: payload
        }
        case GET_USER_BLOG_FAIL: return {
            loading: false,
            error: payload
        }

        default: return state
    }
}