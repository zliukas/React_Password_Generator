import React, { Component, } from 'react';
import background from "../src/video/background.mp4"
import "./App.scss"
import HackerText, { hackerTextFunction } from 'react-hacker-text'

const passwordList = require('./list.json');

export default class App extends Component {
  state = {
    
    passphrase: '',
    
  }

  componentWillMount = () => {
    
    const [passphrase] = this.generatePassphrase();

    this.setState({passphrase});
  }

  randomCrypto = () => {
    const cryptoObj = window.crypto || window.msCrypto; // for IE 11
    const randomBuffer = new Uint32Array(1);
    cryptoObj.getRandomValues(randomBuffer);
    const randomNumber = randomBuffer[0] / (0xffffffff + 1);

    return randomNumber;
  }

  getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(this.randomCrypto() * (max - min + 1)) + min;
  }

  rollDice = () => {
    return String.fromCharCode(parseInt(2680 + this.getRandomIntInclusive(0, 5), 16));
  }

  generatePassphrase = (length = 5) => {
    const pw = {};
    for (let i = 0; i < length; ++i) {
      let key = '';
      for (let j = 0; j < 5; ++j) {
        key += this.getRandomIntInclusive(1, 6).toString();
      }
      pw[key] = passwordList[key];
    }

    return [Object.values(pw).join('_')];
  }

  render = () => {
    return (

      <div className='main'>

          <div className="overlay"></div>

          <video src={background} autoPlay loop muted />

          <div className="content">
          

          <h2 className='box-text1'> <HackerText text='Stay safe out there ;)' /></h2>
          <br></br><br></br><br></br><br></br>
            <h2 className='box-text'> Password Generator</h2>
            <br></br><br></br>
            <h1 className='passphrase'>{this.state.passphrase}</h1>
            <br></br>
            <button className='btn_primary1' onClick={this.componentWillMount}>Generate password</button>
          </div>

      </div>
    );
  }
}