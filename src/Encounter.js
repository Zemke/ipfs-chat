import React from 'react';

export default class EncounterComponent extends React.Component {

  state = {alienToken: '', token: null};

  onClickSubscribe = async e => {
    e.preventDefault();
    await this.props.unsubscribe(this.state.token);
    await this.props.subscribe(this.state.alienToken);
  };

  render() {
    return (
      <>
        <p>Give this token to your alien:</p>
        <p className="monospace">{this.props.token}</p>

        <p>Or paste your alien’s token:</p>
        <form className="flex">
          <input type="text" className="formControl monospace"
                 value={this.state.alienToken}
                 onChange={e => this.setState({alienToken: e.target.value})}/>
          <button onClick={this.onClickSubscribe}
                  className="button">
            Subscribe
          </button>
        </form>
      </>
    )
  }
};
