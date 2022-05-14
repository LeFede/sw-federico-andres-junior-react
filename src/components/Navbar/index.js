import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import {  getCurrencies } from '../../apollo/queries';
// import { changeCategory, changeCurrency} from '../../features/shop';

import './styles.scss';

import Logo from '../Logo';
import Categories from '../Categories'
import Currencies from '../Currencies'


export default class Navbar extends Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     //cartHover: false,
  //   };
  // }

  render() {
    return (
      <nav className="flex pd-t-3 jsc-sb ali-c zi-1 zi-4 pdpc-h-1">
        <Categories />
        <Logo size={4} />
        <Currencies />
      </nav>
    );
  };
}

// const mapStateToProps = (state) => ({...state})

// const mapDispatchToProps = {
//   changeCategory,
//   changeCurrency,
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
