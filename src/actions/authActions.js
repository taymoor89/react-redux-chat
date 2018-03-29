import { apiServer } from '../config'

export function join(payload) {
    return async (dispatch) => {
        try {
            dispatch({type: 'FETCH_USER_PENDING'})
            
            const options = {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {'content-type': 'application/json'}
            }
            const api = `${apiServer}/users`
            const response = await fetch(api, options)
            const data = await response.json()
            localStorage.setItem('access-token', data.token)
            localStorage.setItem('user-id', data.user._id)           
            dispatch({
                type: 'FETCH_USER_FULFILLED',
                payload: data.user
            })
        } catch (e) {
            dispatch({
                type: 'FETCH_USER_REJECTED',
                payload: e
            })
        }
    }
}

export function fetchUser() {
    return async (dispatch) => {
        try {
            dispatch({type: 'FETCH_USER_PENDING'})

            const userId = localStorage.getItem('user-id')
            const accessToken = localStorage.getItem('access-token')            
        
            const api = `${apiServer}/users/${userId}`
            const options = {
                headers: {
                    'access-token': accessToken
                }
            }
            const response = await fetch(api, options)
            const data = await response.json()

            dispatch({
                type: 'FETCH_USER_FULFILLED',
                payload: data
            })
        } catch (e) {
            dispatch({
                type: 'FETCH_USER_REJECTED',
                payload: e
            })
        }
    }
}

export function signout() {
    localStorage.removeItem('access-token')
    localStorage.removeItem('user-id')    
    return {
        type: 'USER_SIGNOUT'
    }
}