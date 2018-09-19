import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchProducts, fetchCart } from './actions/productActions';
import Reviews from './reviews';


class Productpage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: {
                content: '',
                style: ''
            }
        }
    }
    // cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    handleSetState(payload) {
        this.mounted ? this.setState(payload)
        : null
    }

    componentWillUnmount () {
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;

        // console.log('match', this.props.match.params.name);
        console.error("first entry", this.props.match.params.name)
        this.props.dispatch(fetchProducts('?name='+this.props.match.params.name));
      }

      getItem(product,e) {
        e.preventDefault();

        this.props.dispatch(fetchCart(product));
        // this.cartItems.push(product);
        // localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        // console.log(this.cartItems)

        this.handleSetState ({
            message: {...this.state.message, content:'Added to cart', style:''}
        })

        setTimeout(() => {
            this.handleSetState ({
                message: {...this.state.message, content:'', style: ''}
            })
        }, 2000);

        console.log(this.state)
      }


    render() {
        const { error, loading, products } = this.props;

        if (error) {
          return <div>Error! {error.message}</div>;
        }

        if (loading) {
          return <div>Loading...</div>;
        }

        if (products.length === 0) {
            return <div>...</div>;
        }

        const product = products[0];

        console.error("PRODUCT IS ", product)

        return (
            <div className="pp">
                <div>
                    <h3>{product.name}</h3>
                </div>
                <div>
                    <section>
                        <img className="prodImg" src={"http://localhost:1337"+product.image.url} />
                        <strong><p>{product.category}</p></strong>
                        <p>{product.description}</p>
                        <aside>
                        <ul className="testing">
                            <li>Price: {product.price}kr/kg</li>
                        </ul>
                        <ul className="testing2">
                             <li>Qty: {product.quantity}</li>
                        </ul>
                            <button onClick={(e)=>this.getItem(product,e)}>Add to Cart</button>
                            <div className="added">
                                <div className={this.state.message.style}>{this.state.message.content}</div>
                            </div>
                        </aside>
                    </section>
                 </div>
                <Reviews id={product.id} />

            </div>
        );
    }
};

const mapStateToProps = state => ({
    products: state.items,
    loading: state.loading,
    error: state.error,
  });

  export default connect(mapStateToProps)(Productpage);