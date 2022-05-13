import { Component } from 'react'

import './scss/index.scss'

import Navbar from './components/Navbar'
import Home from './pages/Home'

export default class App extends Component {


  render = () => (
      <div className="App ff-1">
        <Navbar />
        <main className="pdpc-h-1 of-h">
          {/* <div className="gray"></div> */}
          <Home />
        </main>
      </div>
    )
}
