import React, { Component } from 'react'
import { connect } from 'react-redux';

export class BagProduct extends Component {

  renderCurrency = () => {
    return this.props.prices.find(e => {
      return e.currency.symbol === this.props.shop.selectedCurrency
    })
  }

  render() {
    // console.log(this.props)

    const {amount, currency} = this.renderCurrency()
    const {label, symbol} = currency

    return (
      <div className="cart-product hem-20 flex fxfw-cw of-h mg-v-2" >
        <div className="left section flex column">
          <p className="whsp-prew">{this.props.name}</p>
          <strong className="fw-9">{symbol} {amount}</strong>
          {/* <p>Size:</p>
          <p>S M</p>
          <p>Color:</p>
          <p>c1 c2 c3</p> */}
        </div>
        {/* <div className="center section flex column">
          <button>+</button>
          <p>amount</p>
          <button>-</button>
        </div> */}
        <figure className="right section flex column">
          <img src="https://cdn.vox-cdn.com/thumbor/iKqbD98GVm9t-VgiKdSjA2oHomE=/0x0:2439x1625/920x613/filters:focal(1025x618:1415x1008):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/69123675/5.0.png" />
        </figure>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({...state})
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BagProduct)