import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getProduct } from '../../apollo/queries';

import { changePreselect, addToCart, removeFromCart } from '../../features/shop';

import './styles.scss'

export class Product extends Component {
  constructor() {
    super()
    this.state = {
      product: [],
      selectedIndex: 0,
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
            prices: data.product.prices,
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

  handleClickGallery = (e) => {
    
    const index = e.target.attributes.index.value
    this.setState({...this.state, selectedIndex: index})
  }

  renderGallery = (gallery) => {
    return gallery.map((e, index) => <figure key={e} className="c-p" onClick={this.handleClickGallery}>
      <img src={e} index={index}/>
    </figure>)
  }

  renderAttributes = (attributes) => {
    return attributes.map(({name, items}) => <fieldset className="ff-2 mg-t-3 tt-uc fieldset gap-1" key={name}>
      <legend className="fw-9 pd-v-1">{name}:</legend>
      <div className="attributes">
        {this.renderAttributeItems(name, items)}
      </div>
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
      if (name !== 'Color') {
        return <label className="ff-2 attribute" key={id}>
          <input onChange={this.handleChangeAttribute} name={name} type="radio" value={displayValue} id={value} defaultChecked={index===0} />
          <p className="pd-1">{value}</p> 
        </label>
      } else {
        return <label className="ff-2 attribute color" key={id} style={{ backgroundColor: value
}}>
          <input 
            // className="color"
            style={{backgroundColor: value, width: '100%', paddingBottom: '100%', display: 'block'}}
            onChange={this.handleChangeAttribute} 
            name={name} 
            type="radio" 
            value={displayValue} 
            id={value} 
            defaultChecked={index === 0} />
        </label>
      }
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
    
    return <div className="Product">
      <div className="column left">
        {this.renderGallery(gallery)}
      </div>
      <div className="column center">
        <img src={gallery[this.state.selectedIndex]} />

      </div>
      <div className="column right">
        <h1 className="w-max">{this.state.product.name}</h1>
        {/* <p>{this.state?.product?.inStock ? 'In Stock' : 'Out Of Stock'}</p> */}
        {this.renderAttributes(attributes)}
        <p className="ff-2 tt-uc fw-9 mg-t-3">Price:</p>
        <p className="price fw-9 fs-1 pd-v-2">{price.currency?.symbol}{price?.amount} ({price.currency?.label})</p>
        <div className="mg-t-3">
          <button className="add-to-cart" onClick={this.handleAddToCart}>Add to cart</button>
          <button className="remove-from-cart" onClick={this.handleRemoveFromCart}>Remove from cart</button>
        </div>
        <div className="mg-t-3" dangerouslySetInnerHTML={{ __html: this.state?.product?.description }}></div>
      </div>
   
    </div>
  }
}

const mapStateToProps = (state) => ({...state})
const mapDispatchToProps = {
  changePreselect,
  addToCart,
  removeFromCart
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product))