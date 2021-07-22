import React, { Component } from 'react'
import '../css/landing.css'

class Calculation extends Component {
    render() {
        return (
            <div className="final-data-main-div">
                <div className="final-data">
                    <div>Sub Total</div>
                    <div>{this.props.itemData.subTotal}</div>
                </div>
                <div className="final-data">
                    <div>Sales Tax</div>
                    <div>{this.props.itemData.salesTax}</div>
                </div>
                <div className="final-data final-total-text">
                    <div>Total</div>
                    <div>{this.props.itemData.total}</div>
                </div>
            </div>
        )
    }
}

export default Calculation