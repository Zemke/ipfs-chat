import React from 'react';
import './Message.css'

export default class MessageComponent extends React.Component {

  render() {
    const from = this.props.message.userId === this.props.userId ? 'You' : 'Alien';

    return (
      <div className={`message ${from.toLowerCase()}`}>
        <div className="from">{from}</div>
        <div className="body">{this.props.message.body}</div>
      </div>
    )
  }
}
