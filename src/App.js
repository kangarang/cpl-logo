import React, { Component } from 'react';
import './App.css';
import providers from 'ethers/providers';
import styled from 'styled-components'

const Color = styled.div`
  background-color: ${(({ bgColor }) => bgColor)};
  filter: saturate(${(({ sat }) => sat)});
`

class App extends Component {
  state = {
    latestHash: '0x',
    colorOne: 'blue',
    colorTwo: 'green',
    colorThree: 'red'
  };

  getLatestBlockHash = async () => {
    const provider = new providers.InfuraProvider('mainnet');
    const blockNumber = await provider.getBlockNumber();
    const block = await provider.getBlock(blockNumber);
    const blockHash = block.hash;
    const colorOne = `#${blockHash.slice(2, 8)}`;
    const colorTwo = `#${blockHash.slice(8, 14)}`;
    const colorThree = `#${blockHash.slice(14, 20)}`;
    console.log('blockHash:', blockHash, colorOne, colorTwo);
    this.setState({
      latestHash: blockHash,
      colorOne,
      colorTwo,
      colorThree
    });
  };

  render() {
    return (
      <div className="App">
        <h3>Latest block hash: {this.state.latestHash}</h3>
        <button onClick={this.getLatestBlockHash}>Get latest block hash</button>

        <br/>
        <Color bgColor={this.state.colorOne}>{this.state.colorOne}</Color>
        <Color bgColor={this.state.colorTwo}>{this.state.colorTwo}</Color>
        <Color bgColor={this.state.colorThree}>{this.state.colorThree}</Color>
        <br/>
        <Color bgColor={this.state.colorOne} sat={.5}>Saturated 50%: {this.state.colorOne}</Color>
        <Color bgColor={this.state.colorTwo} sat={2}>Saturated 200%: {this.state.colorTwo}</Color>
        <Color bgColor={this.state.colorThree} sat={4}>Saturated 400%: {this.state.colorThree}</Color>
      </div>
    );
  }
}

export default App;
