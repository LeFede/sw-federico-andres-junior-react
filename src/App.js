import { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import './scss/index.scss'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Product from './pages/Product';

export default class App extends Component {


  render = () => (
      <div className="App ff-1">
        <Navbar />
        <main className="pdpc-h-1 of-h">
          {/* <div className="gray"></div> */}
          {/* <Home /> */}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/product/:id' component={Product} />
            <Route path='/cart' component={Home} />
          </Switch>
        </main>
      </div>
    )
}
