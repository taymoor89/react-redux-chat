import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap'

class ChatList extends Component {
    render() {
        const {chat} = this.props
        const chatList = chat.map(chat => {
            let participants = chat.participants.filter(p => p._id !== this.props.userId)            
            participants = participants.map(p => p.name)
            return (
                <ListGroupItem className="d-flex align-items-start" key={chat._id}>
                    <Link to={`${this.props.match.url}/${chat._id}`}>{participants.join(',')}</Link>
                    {
                        (chat.unread > 0)
                        ? <Badge className="ml-auto" href="#" color="danger">{chat.unread}</Badge>
                        : null            
                    }
                </ListGroupItem>
            )
        })

        return (
            <ListGroup>{chatList}</ListGroup> 
        )
    }
}

export default ChatList