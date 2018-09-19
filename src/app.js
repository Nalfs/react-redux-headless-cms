import React, { Component } from 'react';
import ProductList from './productList';
import  Header from './header';
import SimpleSlider from './simpleslider';
import { Route, Switch } from 'react-router-dom';
import Productpage from './productpage';
import Checkout from './checkout';
import Category from './category';

export default class App extends Component {

    render(){
        return(
            <div>
            <Header />
            <SimpleSlider />
            <Switch>
                <Route exact path='/' component={ProductList} />
                <Route  path='/checkout' component={Checkout} />
                <Route  path='/category/:category' component={ProductList} />
                <Route  path='/:name' component={Productpage} />
            </Switch>
            </div>
        );
    }
};
