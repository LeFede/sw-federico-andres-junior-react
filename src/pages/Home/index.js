import React, { Component } from 'react'

import './styles.scss'

export default class Home extends Component {
  renderProduct = (times) => {
    let allProducts = [];

    for (let i = 0; i < times; i++) {
      allProducts = [
        ...allProducts,
        <figure key={i}>
          <img src="https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3=s180-rw" />
          <figcaption className="pd-v-1">Name</figcaption>
          <strong className="fw-9">$ Price!</strong>
        </figure>
      ];
    }

    return allProducts;
  }

  render() {
    return (
      <>
        <h1 className="pd-t-4 w-max">Category Name</h1>
        <section className="grid gt-col-3 gap-c-6 gap-r-10 mg-v-10">
          {this.renderProduct(8)}
        </section>
      </>
    )
  }
}
