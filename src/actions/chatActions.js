import { apiServer } from '../config'

export function fetchChat() {
    return async (dispatch) => {
        const userId = localStorage.getItem('user-id')
        const api = `${apiServer}/users/${userId}/conversations`
        const response = await fetch(api)
        const data = await response.json()
        
        dispatch({
            type: 'FETCH_CHAT_FULFILLED',
            payload: data
        })
    }
}

export function createChat(chat, history) {
    return async (dispatch) => {
        const userId = localStorage.getItem('user-id')
        const payload = {
            ...chat,
            participants: chat.participants.map(user => user._id)
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'content-type': 'application/json'
            }
        }
        const api = `${apiServer}/users/${userId}/conversations`
        const response = await fetch(api, options)
        const data = await response.json()
        
        history.push(`/chat/${data._id}`)
    }
}

export function sendMessage(chatId, message) {
    return async (dispatch) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'content-type': 'application/json'
            }
        }
        const userId = localStorage.getItem('user-id')
        const api = `${apiServer}/users/${userId}/conversations/${chatId}/messages`
        fetch(api, options)
    }
}


export function deleteMessage(chatId, messageId) {
    return async (dispatch) => {
        const options = {
            method: 'DELETE'
        }
        const userId = localStorage.getItem('user-id')
        const api = `${apiServer}/users/${userId}/conversations/${chatId}/messages/${messageId}`
        fetch(api, options)
    }
} 

export function fetchMessages(chatId) {
    return async (dispatch) => {
        const userId = localStorage.getItem('user-id')
        const api = `${apiServer}/users/${userId}/conversations/${chatId}/messages`
        const response = await fetch(api)
        const data = await response.json()
        
        dispatch({
            type: 'FETCH_MESSAGES_FULFILLED',
            payload: {
                chatId: chatId,
                messages: data
            }
        })
    }
}


export function addMessage(payload) {
    return {
        type: 'ADD_MESSAGE',
        payload
    }
}

export function removeMessage(payload) {
    return {
        type: 'REMOVE_MESSAGE',
        payload
    }
}

export function addChat(payload) {
    return {
        type: 'ADD_CHAT',
        payload
    } 
}