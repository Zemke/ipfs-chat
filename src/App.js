import React from 'react';
import './App.css';
import Encounter from "./Encounter";
import uuid from "./uuid";
import Compose from "./Compose";
import Message from "./Message";

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient(`/ip4/${window.location.host}/tcp/5001`);


export default class AppComponent extends React.Component {

  userId = uuid();

  state = {
    alienToken: '',
    token: null,
    topic: null,
    messages: [],
    hasSubscribed: false,
  };

  publish = async body => {
    const msg = Buffer.from(JSON.stringify({
      body: body,
      id: uuid(),
      userId: this.userId,
      timestamp: Date.now(),
    }));
    await ipfs.pubsub.publish(this.state.topic, msg);
  };

  subscribe = async topic => {
    this.setState({topic});
    await ipfs.pubsub.subscribe(topic, ({data, from}) => {
      console.log(`Incoming message on topic ${topic}:`);
      console.log(data, from);
      this.setState({messages: [JSON.parse(data), ...this.state.messages]});
    });
    console.log(`Subscribed to ${topic}`);
    if (topic !== this.state.token) {
      this.setState({hasSubscribed: true});
    }
  };

  unsubscribe = async topic => {
    await ipfs.pubsub.unsubscribe(topic, (...args) => {
      console.log(`Unsubscribe handler on topic ${topic} called:`);
      console.log(args);
    });
    console.log(`Unsubscribed topic ${topic}`);
  };

  render() {
    return (
      <>
        <h1><span className="emphasis">IPFS</span> Chat</h1>

        {(this.state.messages.length || this.state.hasSubscribed) ?
          (
            <>
              <Compose send={this.publish}/>

              <div className="messagesContainer">
                {this.state.messages.map(message => (
                  <Message key={message.id}
                           message={message}
                           userId={this.userId}/>
                ))}
              </div>
            </>
          ) : (
            <Encounter token={this.state.token}
                       subscribe={token => this.subscribe(token)}
                       unsubscribe={token => this.unsubscribe(token)}/>
          )}
      </>
    )
  }

  async componentDidMount() {
    this.setState({token: uuid()}, async () => {
      await this.subscribe(this.state.token);
    });
  }
}
