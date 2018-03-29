export default function reducer(state={
    chat: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case "FETCH_CHAT_PENDING": {
            return {...state, fetching: true}
        }
        
        case "FETCH_CHAT_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }

        case "FETCH_CHAT_FULFILLED": {
            const chat = action.payload.map(chat => {
                chat.messages = []
                chat.unread = 0
                return chat
            })
            return {
                ...state,
                fetching: false,
                fetched: true,
                chat
            }
        }
        
        case "ADD_CHAT": {
            const chatId = action.payload._id
            const found = state.chat.find(chat => chat._id === chatId)
            if(!found) {
                const payload = {
                    ...action.payload,
                    messages: [],
                    unread: 0
                }
                return {
                    ...state,
                    chat: [...state.chat, payload]
                }
            }
            break;
        }

        case "ADD_MESSAGE": {
            const {chatId, message} = action.payload
            return {
                ...state,
                chat: state.chat.map(chat => {
                    if(chat._id === chatId){
                        chat.messages = [...chat.messages, message]
                    }
                    return chat
                })
            }
        }

        case "REMOVE_MESSAGE": {
            const {chatId, messageId} = action.payload
            return {
                ...state,
                chat: state.chat.map(chat => {
                    if(chat._id === chatId){
                        chat.messages = chat.messages.filter(msg => 
                            msg._id !== messageId
                        )
                    }
                    return chat
                })
            }
        }

        case "FETCH_MESSAGES_FULFILLED": {
            return {
                ...state,
                chat: state.chat.map(chat => {
                    if(chat._id === action.payload.chatId){
                        chat.messages = action.payload.messages
                    }
                    return chat
                })
            }
        }
        
        default:
            return state
    }
}