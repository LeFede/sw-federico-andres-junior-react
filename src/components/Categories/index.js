import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getAllCategories } from '../../apollo/queries';
import { changeCategory } from '../../features/shop';

export class Categories extends Component {

  constructor() {
    super()
    this.state = {
      categories: [],
    }
  }

  componentDidMount = () => {
    getAllCategories()
      .then(({ data }) => this.setState({ ...this.state, categories: data.categories }))
      .catch(err => console.log(err))
  }

  handleChangeCategory = (e) => { this.props.changeCategory(e.target.dataset.name); }

  renderCategories = () => {
    const { categories } = this.state;
    const { selectedCategory } = this.props.shop;
    return categories.map(({ name }) => {
      const classesArray = ['c-p', 'pd-b-3', selectedCategory === name ? 'selected' : ''];
      const classes = classesArray.join(' ');
      return <li className={classes} onClick={this.handleChangeCategory} key={name} data-name={name}>{name.toUpperCase()}</li>;
    });
  };

  render() {
    return (
      <ul className="menu-left flex gap-3 wpc-5">
        {this.renderCategories()}
      </ul>
    )
  }
}

const mapStateToProps = (state) => ({...state})
const mapDispatchToProps = {
  changeCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)