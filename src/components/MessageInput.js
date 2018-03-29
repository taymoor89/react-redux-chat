import React, { Component } from 'react';
import { Button, FormGroup, Col, Input } from 'reactstrap';

class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange = (e) => {
        this.setState({text: e.target.value});
    }

    handleKeyPress = (e) => {
        if(e.keyCode === 13){
            this.handleSend()
        }
    }

    handleSend = () => {
        this.props.sendMessage(this.state.text);
        this.setState({text:''});
    }

    render() {
        return (
            <FormGroup row>
                <Col xs={10}>
                    <Input bsSize="lg" type="text" 
                        value={this.state.text} 
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyPress}
                        placeholder="Type your message here ..." />
                </Col>
                <Col xs={2}>
                    <Button type="button" size="lg" color="primary" onClick={this.handleSend}>Send</Button>
                </Col>
            </FormGroup>
        );
    }
}

export default MessageInput