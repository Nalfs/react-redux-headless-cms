import React, { Component } from 'react';
import { fetchProducts} from './actions/productActions';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Category from './category';

class Header extends Component {


    getCat(cat, e) {
        e.preventDefault();
        this.props.dispatch(fetchProducts('?category=' + cat));
        return false;
      }

    render(){
        return(

            <div className="header">
            <Link to={"/"} className="logo">Fungi Food Family</Link>
                <a href="#default" className="region">Choose region <i className="fas fa-caret-down"></i></a>
                <div className="header-right">
                    <a className="active" href="#">FAQ</a>
                    <a href="#">Recipe</a>
                    <a href="#">Fungi meetups</a>
                    <Link to={"/checkout"}><i className="fas fa-shopping-cart"></i></Link>
                </div>
                <div className="header-down">
                    <Category />
                </div>
            </div>
        );
    }
};

const mapStateToProps = () => ({

  });

  export default connect(mapStateToProps)(Header);