import React, { Component } from 'react';
import { ListGroupItem, Button } from 'reactstrap';

const style = {
  position: 'absolute',
  top: '0',
  right: '5px'
};

const ContextButtons = ({ deleteMessage }) => {
  return (
    <div style={style}>
      <Button size="sm" color="danger" onClick={e => deleteMessage()}>
        Delete
      </Button>
    </div>
  );
};

class Message extends Component {
  state = {
    showButtons: false
  };

  handleMouseOver = () => {
    if (this.props.message.sender._id === this.props.userId)
      this.setState({ showButtons: true });
  };

  handleMouseOut = () => {
    this.setState({ showButtons: false });
  };

  handleDelete = () => {
    this.props.deleteMessage(this.props.message._id);
  };

  render() {
    return (
      <ListGroupItem
        className="text-muted"
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
      >
        <strong>{this.props.message.sender.name}</strong>
        <div>{this.props.message.text}</div>
        {this.state.showButtons ? (
          <ContextButtons deleteMessage={this.handleDelete} />
        ) : null}
      </ListGroupItem>
    );
  }
}

export default Message;
