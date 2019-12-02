import React from 'react';

export default class ComposeComponent extends React.Component {

  state = {typing: ''};

  send = async e => {
    e.preventDefault();
    if (!this.state.typing) return;
    await this.props.send(this.state.typing);
    this.setState({typing: ''});
  };

  render() {
    return (
      <form className="flex">
        <input type="text" className="formControl"
               value={this.state.typing}
               onChange={e => this.setState({typing: e.target.value})}/>
        <button type="submit" onClick={this.send} className="button">
          Send
        </button>
      </form>
    )
  }
}
