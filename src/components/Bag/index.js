import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getPriceById, getProduct } from '../../apollo/queries';

import BagProduct from '../BagProduct';
import './styles.scss'


export class Bag extends Component {
  constructor() {
    super()
    this.state = {
      bagProducts: [],
    }
  }

  renderCartItemsNumber = () => {
    const cartLength = this.props.shop.cart.length;
    if (cartLength > 0) return <span className="fw-3">{cartLength} item{cartLength > 1 && 's'}</span>;
    return <span className="fw-3">no items</span>;
  }

  getTotal = () => {
    
    const sum = this.state.bagProducts.reduce((prev, current) => {
      const amount = current.prices.find(e => e.currency.symbol === this.props.shop.selectedCurrency)['amount']
      return prev + amount
    }, 0)

    // console.log(sum)
    return sum
  }

  fetchProductPrices = (id) => {
    getProduct(id)
      .then(({data}) => {
        const products = this.props.shop.cart
        const productsWithPrice = products.map(e => {
          if (e.Id === id) return {...e, prices: data.product.prices, displayName: data.product.name}
          if (e.Id !== id) return this.state.bagProducts.find(f => f.id === e.id)
        })
        console.log(productsWithPrice)
        this.setState({...this.state, bagProducts: [...productsWithPrice]})
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.shop.cart === this.props.shop.cart) return
    this.fetchProductPrices(this.props.shop.preselectedProduct.Id)
  }

  componentDidMount = () => {
    
  }

  renderBagProducts = () => {
    return this.state.bagProducts.map(e => {
      const {Id, prices, displayName } = e
      return <BagProduct name={displayName} prices={prices} key={`${Id}-${Math.random(999999)}`} />
    })
  }

  render() {

    //console.log(this.state.bagProducts)
    const total = this.getTotal()
    return (
      <div className="cart-list-outer pd-t-4 pos-abs r-0 c-p">
        <div className="cart-list pos-abs shaded r-0 bg-5 pd-2 whsp-pre c-n">
          <p className="pd-t-1 fw-9 mg-b-3">My Bag, {this.renderCartItemsNumber()}</p>
          <div className="bag-container">
            {this.renderBagProducts()}
          </div>
          <div className="flex jsc-sb pd-v-2">
            <p className="fw-9">Total</p>
            <p className="fw-9">{total}</p>
          </div>
          {/* <button>VIEW BAG</button>
          <button>CHeckout</button> */}
        </div>
      </div> 
    )
  }
}

const mapStateToProps = (state) => ({...state})
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Bag)
