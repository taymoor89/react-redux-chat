import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { Card,
    CardHeader,
    CardBody,
    CardFooter
} from 'reactstrap'

import MessageInput from './MessageInput'
import Messages from './Messages'
import {
    fetchMessages,
    sendMessage,
    deleteMessage
} from '../actions/chatActions'

const styles = {
    card: {
        height: '100vh'
    },
    cardBody: {
        overflowY: 'scroll'
    }
}

class ChatDetails extends Component {   
    componentWillMount() {
        if(this.props.chat._id){
            this.props.dispatch(fetchMessages(this.props.chat._id)) 
        }
    } 

    componentWillReceiveProps (nextProps) {
        const oldChatId = this.props.chat._id
        const newChatId = nextProps.chat._id
        if(oldChatId !== newChatId && newChatId){            
            this.props.dispatch(fetchMessages(newChatId))
        }
    }

    handleDeleteMessage = (messageId) => {
        const chatId = this.props.chat._id
        this.props.dispatch(deleteMessage(chatId, messageId))
    }

    handleSendMessage = (text) => {
        const message = {text}
        this.props.dispatch(sendMessage(this.props.chat._id, message))
    }

    render() {
        let participants = this.props.chat.participants.filter(p => p._id !== this.props.userId)
        participants = participants.map(p => p.name).join(',')
    
        return (
            <Card className="d-flex flex-column align-items-start" style={styles.card}>
                <CardHeader className="container">
                    {participants}
                </CardHeader>
                <CardBody className="container" style={styles.cardBody}>
                    <Messages
                        userId = {this.props.userId}
                        deleteMessage={this.handleDeleteMessage} 
                        messages={this.props.chat.messages}/>
                </CardBody>
                <CardFooter className="container mt-auto">
                    <MessageInput sendMessage={this.handleSendMessage}/>
                </CardFooter>
            </Card>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const defaultChat = { 
        _id: '',
        participants: [],
        messages: [] 
    }
    const chat = state.chat.chat.find(item => 
        item._id === ownProps.match.params.id
    ) || defaultChat

    return {
        chat,
        userId: state.auth.user._id
    }
}

export default withRouter(connect(mapStateToProps)(ChatDetails))