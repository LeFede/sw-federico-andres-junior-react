import React, { Component } from 'react';

import './styles.scss';

import cart from '../../assets/cart.svg';
import cart2 from '../../assets/cart-2.svg';
import arrow from '../../assets/up-arrow.svg';

import Logo from '../Logo';

export default class index extends Component {

  constructor() {
    super();
    this.state = {
      currencyHover: false,
      cartHover: false
    };
  }

  setCurrencyHover = (el) => this.setState({ ...this.state, currencyHover: el });


  render = () => {
    return (
      <nav className="flex pd-t-3 jsc-sb ali-c zi-1 zi-4 pdpc-h-1">
        <ul className="menu-left flex gap-3 wpc-5">
          <li className="c-p pd-b-3 selected" data-name="all">ALL</li>
          <li className="c-p pd-b-3" data-name="tech">TECH</li>
          <li className="c-p pd-b-3" data-name="clothes">CLOTHES</li>
        </ul>
        <Logo size={4} />
        <div className="wpc-5 pd-b-3 flex jsc-fe">
          <ul className="flex fx-wr wem-10">
            <li className="currency c-p wpc-5 flex ali-c jsc-sa"
              onMouseEnter={() => this.setCurrencyHover(true)}
              onMouseLeave={() => this.setCurrencyHover(false)}
            >
              <p>$</p>
              <div className={`arrow ${this.state.currencyHover && 'rotate'}`}><img src={arrow} /></div>
            </li>
            <li className="cart wpc-5 c-p jsc-c flex ali-c">
              <div className="svg wem-3"><img src={cart} /></div>
              <div className="svg wem-3"><img src={cart2} /></div>
              <div className="svg wem-3"><img src={cart2} /></div>
              <div className="svg">
                <div className="circle dem-3 round ff-2">
                  3
                </div>
              </div>
            </li>
            <div className="dropdown wpc-10 pd-t-4 pos-abs c-p"
              onMouseEnter={() => this.setCurrencyHover(true)}
              onMouseLeave={() => this.setCurrencyHover(false)}
            >
              <menu className="ta-c pos-abs wpc-10 shaded">
                <div className="pd-1 c-p">$ USD</div>
                <div className="pd-1 c-p">£ GBP</div>
                <div className="pd-1 c-p">A$ AUD</div>
                <div className="pd-1 c-p">¥ JPY</div>
                <div className="pd-1 c-p">₽ RUB</div>
              </menu>
            </div>

            <div className="cart-list-outer pd-t-4 pos-abs r-0 c-p">
              <div className="cart-list pos-abs shaded r-0 bg-5 pd-2 whsp-pre c-n">
                <p className="pd-t-1 fw-9 mg-b-3">My Bag, <span className="fw-3">3 items</span></p>
                <div className="cart-product hem-20 flex fxfw-cw of-h">
                  <div className="left section flex column">
                    <p>Name</p>
                    <strong>$ Price</strong>
                    <p>Size:</p>
                    <p>S M</p>
                    <p>Color:</p>
                    <p>c1 c2 c3</p>
                  </div>
                  <div className="center section flex column">
                    <p>+</p>
                    <p>amount</p>
                    <p>-</p>
                  </div>
                  <figure className="right section flex column">
                    <img src="https://cdn.vox-cdn.com/thumbor/iKqbD98GVm9t-VgiKdSjA2oHomE=/0x0:2439x1625/920x613/filters:focal(1025x618:1415x1008):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/69123675/5.0.png" />
                  </figure>
                </div>
                
                <div className="flex jsc-sb pd-v-2">
                  <p className="fw-9">Total</p>
                  <p className="fw-9">$200</p>
                </div>
                <button>VIEW BAG</button>
                <button>CHeckout</button>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    );
  };
}
