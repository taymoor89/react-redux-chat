import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap'

import { join } from '../actions/authActions'

const style = {
    height: '100vh'
}

class Login extends Component {
    state = {
        name: '',
        username: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleJoin = async () => {
        const {name, username, password} = this.state
        this.props.dispatch(join({name, username, password}))
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } }
        if(this.props.isAuthenticated) {
            return <Redirect to="/chat" />
        }

        return (
            <Row className="d-flex flex-column bg-light" style={style}>
                <Col sm="3" className="align-self-center text-center">
                    <h1>Simple Chat</h1>
                    <Form>
                        <FormGroup>
                            <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter your full name" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                        </FormGroup>
                        <Button block color="primary" onClick={this.handleJoin}>JOIN</Button>
                    </Form>
                </Col>
            </Row>
        )    
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Login)