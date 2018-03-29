import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Input,
    Badge
} from 'reactstrap'

import Users from './Users'

class CreateChat extends React.Component {
    state = {
        searchTerm: '',
        users: [],
        participants: []
    }

    componentWillReceiveProps(nextProps) {
        this.setState({users: nextProps.users})
    }

    handleDone = () => {
        this.props.createChat(this.state.participants)
        this.setState({
            participants: [],
            searchTerm: ''
        })
    }

    handleChange = (e) => {
        const searchTerm = e.target.value
        this.setState({searchTerm})
        this.searchUsers(searchTerm)
    }

    searchUsers = async (searchTerm) => {
        if(!searchTerm){
            this.setState({users: [...this.props.users]})
            return
        }
        const matcher = new RegExp(`${searchTerm}`, 'i')
        const users = this.props.users.filter(user => {
            return user.name.match(matcher)
        })
        this.setState({users})
    }

    toggleUser = (user) => {
        const existingUser = this.state.participants.find(participant => 
            participant._id === user._id
        )    

        if(existingUser){
            const participants = this.state.participants.filter(participant => 
                participant._id !== user._id
            )
            this.setState({participants})
            return
        }

        this.setState({participants: [...this.state.participants, user]})
    }

    render() {
        return (
            <span>
                <strong color="danger" onClick={this.props.toggle}>[+]</strong>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.props.toggle}>Start New Chat</ModalHeader>
                    <ModalBody>
                        {
                            this.state.participants.map(participant => {
                                return <Badge key={participant._id} color="primary" pill
                                    onClick={e => this.toggleUser(participant)}
                                    >{participant.name} x</Badge>
                            })
                        }
                        <Form>
                            <Input 
                                bsSize="lg" 
                                vlaue={this.state.searchTerm} 
                                onChange={this.handleChange}
                                placeholder="Search here" />
                        </Form>
                        <Users toggleUser={this.toggleUser} users={this.state.users} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleDone}>Done</Button>{' '}
                        <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </span>
        )
    }
}

export default CreateChat