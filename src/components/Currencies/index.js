import React, { Component } from 'react'
import { connect } from 'react-redux';

import cart from '../../assets/cart.svg';
import cart2 from '../../assets/cart-2.svg';
import arrow from '../../assets/up-arrow.svg';

import { getCurrencies } from '../../apollo/queries';
import { changeCurrency } from '../../features/shop';

export class Currencies extends Component {

  constructor() {
    super()
    this.state = {
      currencies: [],
      currencyHover: false,
    }
  }

  setCurrencyHover = (el) => this.setState({ ...this.state, currencyHover: el });

  handleChangeCurrency = (e) => {this.props.changeCurrency(e.target.dataset.symbol)}

  componentDidMount = () => {
    getCurrencies()
      .then(({ data }) => this.setState({ ...this.state, currencies: data.currencies }))
      .catch(err => console.log(err))
  }

  renderCurrencies = () => {
    const { currencies } = this.state;
    return currencies.map(({ label, symbol }) => <div
      key={symbol}
      className="pd-1 c-p"
      data-symbol={symbol}
      onClick={this.handleChangeCurrency}>
      {symbol} {label}
    </div>
    );
  }

  renderCartNumber = () => {
    const cartLength = this.props.shop.cart.length
    return cartLength > 0 && <div className="circle dem-3 round ff-2">{cartLength}</div>
  }

  render() {
    return (
      <div className="wpc-5 pd-b-3 flex jsc-fe">

        <ul className="flex fx-wr wem-10">

          <li className="currency c-p wpc-5 flex ali-c jsc-sa"
            onMouseEnter={() => this.setCurrencyHover(true)}
            onMouseLeave={() => this.setCurrencyHover(false)}
          >
            <p>{this.props.shop.selectedCurrency}</p>
            <div className={`arrow ${this.state.currencyHover && 'rotate'}`}><img src={arrow} /></div>
          </li>
          <li className="cart wpc-5 c-p jsc-c flex ali-c">
            <div className="svg wem-3"><img src={cart} /></div>
            <div className="svg wem-3"><img src={cart2} /></div>
            <div className="svg wem-3"><img src={cart2} /></div>
            <div className="svg">
              {this.renderCartNumber()}
            </div>
          </li>
          <div className="dropdown wpc-10 pd-t-4 pos-abs c-p"
            onMouseEnter={() => this.setCurrencyHover(true)}
            onMouseLeave={() => this.setCurrencyHover(false)}
          >
            <menu className="ta-c pos-abs wpc-10 shaded">
              {this.renderCurrencies()}
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
    )
  }
}

const mapStateToProps = (state) => ({...state})
const mapDispatchToProps = {
  changeCurrency
}
export default connect(mapStateToProps, mapDispatchToProps)(Currencies)