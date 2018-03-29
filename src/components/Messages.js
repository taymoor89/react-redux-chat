import React, { Component } from 'react'
import Message from './Message'
import { ListGroup } from 'reactstrap'

class Messages extends Component {
    scrollToBottom = () => {
        this.el.scrollIntoView({ behavior: "smooth" });
    }
    
    componentDidMount() {
        this.scrollToBottom();
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <ListGroup>
                {
                    this.props.messages.map(
                        message => <Message userId={this.props.userId} deleteMessage={this.props.deleteMessage} key={message._id} message={message}/>
                    )
                }     
                <div ref={el => this.el = el}></div>        
            </ListGroup>
        )
    }
}

export default Messages