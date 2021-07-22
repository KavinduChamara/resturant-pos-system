import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'
import Item from '../components/Item'
import '../css/landing.css'
import { FcEmptyTrash, FcPlus, FcMinus } from 'react-icons/fc';
import Calculation from '../components/Calculation'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            goods: [],
            categories: [],
            columns: [],
            items: [],
            total: 0,
            subTotal: 0,
            displayItems: [],
            shopName: "",
            locationId: ""
        }
    }

    componentDidMount = async () => {      
        await api.getAllGoods().then(goods => {
            this.setState({
                goods: goods.data.data,
                displayItems:  goods.data.data,
            })
        })

        await api.getAllCategories().then(categories => {
            this.setState({
                categories: categories.data.data
            })
        })

        await api.getAllConfigs().then(configs => {
            this.setState({
                shopName: (configs.data.data).filter(obj => obj.name === "shopName")[0].config,
                locationId: (configs.data.data).filter(obj => obj.name === "locationId")[0].config
            })
        })
    }

    increaseQuantity(id) {
        let itemUnitPrice = (this.state.goods).filter(obj => obj.name === id)[0].price;
        let newState = (this.state.items).map(obj =>
            obj.name === id ? { ...obj, quantity: obj.quantity+1, total: (obj.quantity+1)*itemUnitPrice } : obj
        );
        this.setState({
            items: newState,
            subTotal: this.state.subTotal + itemUnitPrice,
        })
    }

    decreaseQuantity(id) {
        let itemUnitPrice = (this.state.goods).filter(obj => obj.name === id)[0].price;
        let newState = (this.state.items).map(obj =>
            obj.name === id ? { ...obj, quantity: obj.quantity-1, total: (obj.quantity-1)*itemUnitPrice } : obj
        );
        this.setState({
            items: newState,
            subTotal: this.state.subTotal - itemUnitPrice,
        })
    }

    deleteItem(id) {
        let itemUnitPrice = (this.state.goods).filter(obj => obj.name === id)[0].price;
        let newState = (this.state.items).filter((item) => item.name !== id);
        this.setState({
            items: newState,
            subTotal: this.state.subTotal - itemUnitPrice,
        })
    }

    addingFromMainMenu(id, imageName, index) {       
        let itemUnitPrice = (this.state.goods).filter(obj => obj.name === id)[0].price;
        if ((this.state.items).find(x => x.name === id)) {
            let newState = (this.state.items).map(obj =>
                obj.name === id ? { ...obj, quantity: obj.quantity+1, total: (obj.quantity+1)*itemUnitPrice, image: imageName, id: index } : obj
            );
            this.setState({
                items: newState
            })
        } else {
            this.setState({
                items: [
                  ...this.state.items,
                  {'name': id, 'quantity' : 1, 'total': itemUnitPrice, 'image': imageName, 'id': index} 
                ]
              })
        }

        this.setState({
            subTotal: this.state.subTotal + itemUnitPrice,
        })
    }

    addOrder() {
        let result = (this.state.items).map(e => ({ id: e.id, quantity: e.quantity }));
        api.insertOrder({
            "subTotal" : (this.state.subTotal).toFixed(2),
            "tax" : (this.state.subTotal*0.05).toFixed(2),
            "total" : (this.state.subTotal + this.state.subTotal*0.05).toFixed(2),
            "discount" : 0,
            "items" : result,
        }).then(order2 => {
            this.setState({
                items: [],
                total: 0,
                subTotal: 0,
            })
        })
    }
   
    changeCategory(category) {
        if (category == 'all') {
            this.setState({
                displayItems:  this.state.goods,
            })
        } else {
            let filteredItems = (this.state.goods).filter(obj => obj.category[0].name === category);
            this.setState({
                displayItems:  filteredItems,
            })
        }
    }

    clearOrder() {
        this.setState({
            items: [],
            total: 0,
            subTotal: 0,
        })
    }

    render() {
        const { items, displayItems, categories } = this.state
        return (
            <Wrapper>
                <div className="main-div">
                    <div className="menu-div">
                        <div>
                            <div>
                                <h2>{this.state.shopName}</h2>
                                <h6>Location Id#{this.state.locationId}</h6>
                            </div>
                            <div className="category-section">
                                <button className="category-btn" onClick={() => this.changeCategory('all')}>All Items</button>
                                {categories.map((category) => (
                                    <button className="category-btn" onClick={() => this.changeCategory(category.name)}>{category.name}</button>
                                ))}
                            </div>
                        </div>                        
                        <div className="items-list-div">
                            {displayItems.map((good) => (
                                <div className="item-div-main" onClick={() => this.addingFromMainMenu(good.name, good.image, good._id)}>
                                    <Item itemData={{ name: good.name, price: '$'+(good.price).toFixed(2), image: good.image, amount: good.amount}} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="list-div">
                        <div>
                            <span className="current-order-span">Current Order</span>
                            <button className="clear-btn" onClick={() => this.clearOrder()}>Clear All</button>
                            <table className="list-table">
                                {items.map((item) => (
                                    <tr>
                                        <td><img className="list-image" src={"/images/"+item.image} /></td>
                                        <td>{item.name}</td>
                                        <td>
                                            {item.quantity > 1 ? <div onClick={() => this.decreaseQuantity(item.name)}><FcMinus /></div>
                                            : <div onClick={() => this.deleteItem(item.name)}><FcEmptyTrash /></div> }
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td><div onClick={() => this.increaseQuantity(item.name)}><FcPlus /></div></td>
                                        <td style={{textAlign: "right"}}>${item.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                        <Calculation itemData={{ subTotal: '$'+this.state.subTotal.toFixed(2), salesTax: '$'+((this.state.subTotal)*0.05).toFixed(2), total: '$'+((this.state.subTotal)+((this.state.subTotal)*0.05)).toFixed(2)}} />
                        <div className="pay-btn-div">
                            <button className="pay-btn" onClick={() => this.addOrder()}>Pay</button>
                        </div>
                    </div>
                </div>
            </Wrapper>
        )
    }
}

export default Landing