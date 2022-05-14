import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getProduct } from '../../apollo/queries';


export class Product extends Component {
  constructor() {
    super()
    this.state = {
      product: []
    }
  }

  fetchProduct = (e) => {
    getProduct(e)
      .then(({data}) => this.setState({...this.state, product: data.product}))
      .catch(err => console.log(err))
  }

  componentDidMount = () => {
    this.fetchProduct(this.props.match.params.id)
  }

  renderGallery = (gallery) => {
    return gallery.map(e => <figure key={e}>
      <img src={e} />
    </figure>)
  }

  renderAttributes = (attributes) => {
    return attributes.map(e => <div key={e.name}>
      <p>{e.name}</p>
      <div>
        {this.renderAttributeItems(e.items)}
      </div>
    </div>)
  }

  renderAttributeItems = (items) => {
    return items.map(e => <div key={e.id}>
      {/* <p>{e.id}</p> */}
      {/* <p>{e.displayValue}</p> */}
      <p>{e.value}</p>
    </div>)
  }
  
  render() {
    const gallery = this.state.product?.gallery ?? []
    const attributes = this.state.product?.attributes ?? []

    return <>
      <h1 className="pd-t-4 w-max">{this.state.product.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: this.state?.product?.description }}></div>
      <p>{this.state?.product?.inStock ? 'In Stock' : 'Out Of Stock'}</p>

      {this.renderAttributes(attributes)}
      {this.renderGallery(gallery)}
    </>
  }
}

export default withRouter(Product)