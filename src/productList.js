import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchProducts, setSortMethod, SortingMethods } from './actions/productActions';
import { Link } from 'react-router-dom';

class ProductList extends Component {

    componentDidMount() {
        this.props.dispatch(fetchProducts());

      }

      componentDidUpdate() {
      }

      getPrice(e) {
        e.preventDefault();
        if (this.props.sort === SortingMethods.SORT_PRICE_ASC) {
          this.props.dispatch(setSortMethod(SortingMethods.SORT_PRICE_DESC));
          this.props.dispatch(fetchProducts('?_sort=price:desc'));
        } else {
          this.props.dispatch(setSortMethod(SortingMethods.SORT_PRICE_ASC));
          this.props.dispatch(fetchProducts('?_sort=price:asc'));
        }
        return false;
      }

      getQty(e) {
        e.preventDefault();
        if (this.props.sort === SortingMethods.SORT_QTY_ASC) {
          this.props.dispatch(setSortMethod(SortingMethods.SORT_QTY_DESC));
          this.props.dispatch(fetchProducts('?_sort=quantity:desc'));
        } else {
          this.props.dispatch(setSortMethod(SortingMethods.SORT_QTY_ASC));
          this.props.dispatch(fetchProducts('?_sort=quantity:asc'));
        }
      }

      render() {
        const { error, loading, products } = this.props;

        if (error) {
          return <div>Error! {error.message}</div>;
        }

        if (loading) {
          return <div>Loading...</div>;
        }
        const currentCategory = this.props.match.params.category || '';
        let productList = [];

        if (currentCategory !== undefined && currentCategory !== ''){
          productList = products.filter(item => item.category === currentCategory);

        } else {
          productList = products;
        }


        return (
          <div>
            <div className="flex-main-content">
              <div className="test">Sort your mushrooms</div>
              <div className="dropdown">
                <div className="dropbtn">...</div>
                <div className="dropdown-content">
                  <a onClick={(e)=>this.getPrice(e)}>Price</a>
                  <a onClick={(e)=>this.getQty(e)}>Qty</a>
                </div>
              </div>
            </div>
            <div className="flex">{productList.map((product, index) =>
                <section key={index.toString()}>
                <Link to={"/"+ product.name}>
                  <img className="prodImg" src={"http://localhost:1337"+product.image.url} />
                  <h3>{product.name}</h3>
                  </Link>
                  <span>{product.category}</span>
                  <p>{product.description}</p>
                  <aside>
                    <ul>
                     <li>Price: {product.price}kr/kg</li>
                     <li>Qty: {product.quantity}</li>
                   </ul>
                   <Link to={"/"+ product.name}><button>Add to Cart</button></Link>
                  </aside>

                </section>
              )}
            </div>
          </div>
        );
      }
    }

    const mapStateToProps = state => ({
      products: state.items,
      loading: state.loading,
      error: state.error,
      sort: state.sort
    });

    export default connect(mapStateToProps)(ProductList);