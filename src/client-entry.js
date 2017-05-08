// src/app-client.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import 'normalize.css'
import './style'

window.onload = () => {
  ReactDOM.render(<App />, document.getElementById('app-mount-point'));
}
