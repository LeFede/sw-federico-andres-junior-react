import React, { Component } from 'react'

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import './styles.scss'

import { getProductsByCategory } from '../../apollo/queries';
import { Link } from 'react-router-dom';

export class Home extends Component {

  constructor() {
    super()
    this.state = {
      products: []
    }
  }

  renderProducts = () => {
    return this.state.products.map(e=> {
      const price = e.prices.find(e => e.currency.symbol === this.props.shop.selectedCurrency)
      const id = e.id
      return <figure key={e.name}>
        <Link to={`/product/${id}`} className="pdpc-b-10 bgs-ccn block wpc-10" style={{backgroundImage: `url(${e.gallery[0]})`}} />
        <figcaption className="pd-v-1">{e.name}</figcaption>
        <strong className="fw-9">{price.currency.symbol} {price.amount}</strong>
      </figure>
    })
  }

  fetchProductsByCategory = (e) => {
    getProductsByCategory(e)
      .then(({ data }) => this.setState({ ...this.state, products: data.category.products }))
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.shop.selectedCategory === this.props.shop.selectedCategory) return
    this.fetchProductsByCategory(this.props.shop.selectedCategory)
  }

  componentDidMount = () => this.fetchProductsByCategory(this.props.shop.selectedCategory)



  render() {
    const {selectedCategory} = this.props.shop
    const formatedSelectedCategory = `${selectedCategory[0].toUpperCase()}${selectedCategory.slice(1)}`

    return <>
      <h1 className="w-max">{formatedSelectedCategory}</h1>
      <section className="grid gt-col-3 gap-c-6 gap-r-10 mg-v-10">
        {this.renderProducts()}
      </section>
    </>
  }
}

const mapStateToProps = (state) => ({...state})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)