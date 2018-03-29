import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from 'reactstrap'

import { apiServer } from '../config'

import Signout from './Signout'
import ChatList from './ChatList'
import ChatDetails from './ChatDetails'
import CreateChat from './CreateChat'

import { fetchChat } from '../actions/chatActions'
import { signout} from '../actions/authActions'
import { fetchUsers } from '../actions/usersActions'
import { createChat } from '../actions/chatActions'
import { 
    addMessage,
    removeMessage,
    addChat
} from '../actions/chatActions'

const styles = {
    card: {
        height: '100vh'
    },
    cardBody: {
        overflowY: 'auto'
    }
}

class Chat extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            modal: false
        }
        const socket = io.connect(apiServer, {
            query: {
                userId: localStorage.getItem('user-id')
            }
        })

        socket.on('new-message', (payload) => {
            this.props.dispatch(addMessage(payload))
        })

        socket.on('delete-message', (payload) => {
            this.props.dispatch(removeMessage(payload))
        })

        socket.on('new-chat', (payload) => { 
            this.props.dispatch(addChat(payload))
        })

    }
    componentWillMount() {
        this.props.dispatch(fetchUsers())
        this.props.dispatch(fetchChat())
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    handleSignout = () => {
        this.props.dispatch(signout())
    }

    createChat = (participants) => {
        this.props.dispatch(
            createChat({participants}, this.props.history)
        )
        this.toggle()
    }

    render() {
        return (
            <div>
                <Row noGutters>
                    <Col sm="3">
                        <Card style={styles.card}>
                            <CardHeader>
                                <span>({this.props.user.username}) Conversations </span>
                                <CreateChat className="ml-auto" users={this.props.users} createChat={this.createChat} toggle={this.toggle} modal={this.state.modal} />                    
                            </CardHeader>
                            <CardBody style={styles.cardBody}> 
                                <ChatList {...this.props} userId={this.props.userId} chat={this.props.chat}/>
                            </CardBody>
                            <CardFooter className="d-flex flex-column">
                                <Signout className="ml-auto" signout={this.handleSignout}/>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col sm="9" xs={12}>
                        <Route 
                            path={`${this.props.match.url}/:id`}
                            render={props=> <ChatDetails {...props} chat={this.props.chat} />}
                        />
                    </Col>
                </Row>
            </div>            
        )
    }
}

const mapStateToProps = state => {
    const userId = state.auth.user._id
    const users = state.users.users.filter(user => user._id !== userId)
    return {
        userId,
        users,
        user: state.auth.user,
        chat: state.chat.chat
    }
}

export default withRouter(connect(mapStateToProps)(Chat))