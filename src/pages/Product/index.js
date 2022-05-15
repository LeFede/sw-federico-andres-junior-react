import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getProduct } from '../../apollo/queries';

import { changePreselect, addToCart, removeFromCart } from '../../features/shop';


export class Product extends Component {
  constructor() {
    super()
    this.state = {
      product: [],
      // isChecked: ,
    }
  }

  fetchProduct = (e) => {
    getProduct(e)
      .then(({data}) => {
        
        data.product.attributes.map(e=> {

          const newSelect = {
            productId: this.props.match.params.id,
            attribute: e.name,
            attributeValue: e.items[0].value,
          }

          this.props.changePreselect(newSelect)
        })
        return this.setState({...this.state, product: data.product})
      })
      .catch(err => console.log(err))

  }

  componentDidMount = () => {
    this.fetchProduct(this.props.match.params.id)
    // console.log(this.props.shop.cart)
  }

  renderGallery = (gallery) => {
    return gallery.map(e => <figure key={e}>
      <img src={e} />
    </figure>)
  }

  renderAttributes = (attributes) => {
    return attributes.map(({name, items}) => <fieldset key={name}>
      <legend>{name}</legend>
      {/* <div onChange={() => console.log('changed')}> */}
        {this.renderAttributeItems(name, items)}
      {/* </div> */}
    </fieldset>)
  }

  handleChangeAttribute = (e) => {
    const { id, name } = e.target.attributes
    const { value: attributeValue } = id
    const { value: attribute } = name

    const productId = this.props.match.params.id

    const addedProduct = {
      productId, attribute, attributeValue
    }

    //console.table(addedProduct)
    this.props.changePreselect(addedProduct)
  }

  renderAttributeItems = (name, items) => {
    return items.map(({ value, id, displayValue }, index) => {

      return <label key={id}>
        <input onChange={this.handleChangeAttribute} name={name} type="radio" value={displayValue} id={value} defaultChecked={index===0} />
        {value}
      </label>
    })
  }

  handleAddToCart = () => {
    this.props.addToCart()
  }

  handleRemoveFromCart = () => {
    this.props.removeFromCart()
  }
  
  render() {
    const gallery = this.state.product?.gallery ?? []
    const attributes = this.state.product?.attributes ?? []
    const price = this.state.product.prices?.find(e => e.currency.symbol === this.props.shop.selectedCurrency) ?? []
    
    return <>
      <h1 className="pd-t-4 w-max">{this.state.product.name}</h1>
      <h2>{price.currency?.symbol}{price?.amount} ({price.currency?.label})</h2>
      <div dangerouslySetInnerHTML={{ __html: this.state?.product?.description }}></div>
      <p>{this.state?.product?.inStock ? 'In Stock' : 'Out Of Stock'}</p>
      <div>
        <button onClick={this.handleAddToCart}>+</button>
        <button onClick={this.handleRemoveFromCart}>-</button>
      </div>
      {this.renderAttributes(attributes)}
      {this.renderGallery(gallery)}
    </>
  }
}

const mapStateToProps = (state) => ({...state})
const mapDispatchToProps = {
  changePreselect,
  addToCart,
  removeFromCart
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product))