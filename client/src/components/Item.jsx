import React, { Component } from 'react'
import '../css/menu.css'

class Item extends Component {
    render() {
        return (
            <div>
                <div>{this.props.itemData.name}</div>
                <div className="full-div">
                    <div className="sub-div">
                        <div className="amount-text">{this.props.itemData.amount}</div>
                        <div className="price-text">{this.props.itemData.price}</div>
                    </div>
                    <div>
                        <img className="menu-image" src={"/images/"+this.props.itemData.image} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Item