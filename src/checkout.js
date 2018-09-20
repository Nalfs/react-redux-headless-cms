import React, { Component } from 'react';
import { connect } from "react-redux";
import { postOrder } from './actions/productActions';


class Checkout extends Component {

    constructor(props){
        super(props)
        this.state = {
            makeOrder: {
                Cart: this.groupByKey(this.props.cart),
                Price: this.handlePrice(),
                Customer: {
                    Name:'',
                    Email: '',
                    Adress:''
                }
            }
          }
    }
    componentDidMount () {
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(postOrder(this.state.makeOrder));
        this.setState({makeOrder: {
            Cart: '',
            Price: '',
            Customer: {Name:'',
            Email: '',
            Adress:''}}
          });
          return false;
    }

    handleOnchange(key, e){
        const val = e.target.value;
         let makeOrder = this.state.makeOrder;
         makeOrder.Customer[key] = val;
        this.setState({makeOrder})
        e.preventDefault();
    }

    handlePrice() {
        let sum = 0;
        this.props.cart.map((product) =>
            sum += product.price
          )
          return sum;
        }

        groupByKey(cart) {
            let hash = {}
            cart.forEach((product) => {
                const id = product._id;
                if (hash[id]) {
                    hash[id].amount = hash[id].amount + 1
                } else {
                    hash[id] = {amount: 1, ...product}
                }
            })
            return Object.values(hash)
        }



    render(){

        const makeOrder = this.state.makeOrder;

        const { error, loading } = this.props;

        if (error) {
          return <div>Error! {error.message}</div>;
        }

        if (loading) {
          return <div>Loading...</div>;
        }
        const li = this.groupByKey(this.props.cart)
        return(
            <div className="mainCheck">
                <div className="checkout">
                <h3>Billing Address</h3>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input ref="Name" onChange={(e)=>this.handleOnchange("Name", e)}
                        value={makeOrder.Customer.Name} placeholder="Enter your full name" type="text" name="Name" required/><br />
                        <input ref="Adress" onChange={(e)=>this.handleOnchange("Adress", e)}
                        value={makeOrder.Customer.Adress} placeholder="Enter your adress" type="text" name="Adress" required/><br />
                        <input ref="Email" onChange={(e)=>this.handleOnchange("Email", e)}
                        value={makeOrder.Customer.Email} placeholder="Enter your email" type="text" name="Email" required/><br />
                        <button type="Submit">Send</button>
                        </form>
                </div>
                <div className="checkout-order">
                    <h3>Your order</h3>
                     <div className="checkout-order-items">
                        {li.map((product, index) =>
                            <section key={index.toString()}>
                                <strong><p>{product.name}</p></strong>
                                <p>Price {product.price}kr</p>
                                <p>Amount {product.amount}st</p>
                            </section>
                        )}
                    </div>
                    <strong><p>Total price { this.handlePrice() }: </p></strong>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    orders: state.orders,
    cart: state.cart
});

export default connect(mapStateToProps)(Checkout);