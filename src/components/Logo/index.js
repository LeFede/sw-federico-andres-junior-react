import React, { Component } from 'react'

import './styles.scss'

import logo1 from '../../assets/logo-1.svg';
import logo2 from '../../assets/logo-2.svg';
import logo3 from '../../assets/logo-3.svg';
import logo4 from '../../assets/logo-4.svg'

export default class Logo extends Component {
  
  render = () => {
    return (
      <figure className="logo jsc-c pd-b-3 flex ali-c">
        <div className={`svg wem-${this.props?.size}`}><img className="pos-rel" src={logo1} /></div>
        <div className={`svg wem-${this.props?.size}`}><img className="pos-rel" src={logo2} /></div>
        <div className={`svg wem-${this.props?.size}`}><img className="pos-rel" src={logo3} /></div>
        <div className={`svg wem-${this.props?.size}`}><img className="pos-rel" src={logo4} /></div>
      </figure>
    )
  }
}
