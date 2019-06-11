import React from 'react' 
import ReactDOM from 'react-dom'
import App from './App'

if(!localStorage.getItem('token')) {
    const token = prompt("Enter your token")
    localStorage.setItem('token', token)
    window.location.reload()
}

ReactDOM.render(<App />, document.getElementById('root'))

