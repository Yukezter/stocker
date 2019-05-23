import axios from 'axios'

import { USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL 
} from '../actions/types'
import { getErrors } from './errorActions'

export const loadUser = () => async (dispatch, getState) => {
    const token = getState().auth.token

    if (!token) { return }

    const config = {
        method: 'get',
        url: '/users/getuser',
        headers: {
            authorization: token
        }
    }

    dispatch({ type: USER_LOADING })

    const res = await axios({ ...config })
    console.log(res.data)

    if (res.data.error) {
        dispatch({ type: AUTH_ERROR })
        console.log(res.data.error)
        return
    }

    dispatch({
        type: USER_LOADED,
        payload: res.data.user.username
    })
}

export const signInUser = (usernameOrEmail, password) => {
    return async (dispatch, getState) => {

        dispatch({ type: USER_LOADING })
    
        const res = await axios({
            method: 'post',
            url: '/users/signin',
            data: {
                usernameOrEmail,
                password
            }
        })

        if (res.data.error) {
            dispatch({ type: LOGIN_FAIL })
            dispatch(getErrors(res.data.error, true))
            console.log(res.data.error)
            return
        }

        console.log(res.data)

        localStorage.setItem('token', res.data.token)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                user: res.data.user.username,
                token: res.data.token
            }
        })
    }
}

export const signUpUser = (username, email, password) => {
    return async (dispatch, getState) => {

        dispatch({ type: USER_LOADING })
    
        const res = await axios({
            method: 'post',
            url: '/users/signup',
            data: {
                username,
                email,
                password
            }
        })

        if (res.data.error) {
            dispatch({ type: REGISTER_FAIL })
            dispatch(getErrors(res.data.error, true))
            console.log(res.data.error)
            return
        }

        console.log(res.data)

        localStorage.setItem('token', res.data.token)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                user: res.data.user.username,
                token: res.data.token
            }
        })
    }
}

export const logOutUser = () => (dispatch, getState) => {
    localStorage.removeItem('token')
    dispatch({ type: LOGOUT_SUCCESS })
}