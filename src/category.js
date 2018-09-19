import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class Category extends Component {


    render(){
        return(
                <div className="headerWhat">
                    <Link to="/category/Cuisine">Cuisine</Link>
                    <Link to="/category/Medicinal">Medicinal</Link>
                    <Link to="/category/Poisonous">Poisonous</Link>
                </div>
        );
    }
};

const mapStateToProps = () => ({

  });

  export default connect(mapStateToProps)(Category);