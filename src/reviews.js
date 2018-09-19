import React, { Component } from 'react';
import { connect } from "react-redux";
import { getReview, fetchReview } from './actions/productActions';


class Reviews extends Component {

    constructor(props){
        super(props)
        this.state = {makeReview: {
            ProductId: this.props.id,
            ReviewText:'',
            Rating: '',
            Name:''
          }
        }
        console.error("constructor", this.props.id)
    }

    componentDidMount() {
        this.props.dispatch(fetchReview());
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(getReview(this.state.makeReview));
        this.setState({makeReview: {
            Name: '',
            Rating: '',
            ReviewText:'',
            ProductId: this.props.id,
        }
          });
          console.error("REFIEW", this.props.id)

          return false;
    }

    handleOnchange(key, e){
        const val = e.target.value;
        //  console.log('asdada', val)
         let makeReview = this.state.makeReview;
        makeReview[key] = val;
        this.setState({makeReview})
        e.preventDefault();
    }


    render() {
        const makeReview = this.state.makeReview;
        const { error, loading, reviews } = this.props;
        const getReviewsByProductId =  reviews.filter((item) => item.ProductId === this.props.id.id);
        if (error) {
          return <div>Error! {error.message}</div>;
        }

        if (loading) {
          return <div>Loading...</div>;
        }


        console.log('what is this', this.props.id   )
        console.log('reviews', getReviewsByProductId)

        return (
            <div className="main-reviews">
                <div className="reviews-form">
                <h4>Create a new review</h4>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                    <input ref="Name" onChange={(e)=>this.handleOnchange("Name", e)}
                    value={makeReview.Name} placeholder="Enter your name" type="text" name="Name"/><br />
                    <fieldset className="Rating">
                        <h5>Please rate:</h5>
                        <input type="radio" id="star5" name="Rating" onChange={(e)=>this.handleOnchange("Rating", e)}
                        value="5" checked={this.state.makeReview.Rating === "5"}/><label htmlFor="star5" title="Rocks!">5 stars</label>
                        <input type="radio" id="star4" name="Rating" onChange={(e)=>this.handleOnchange("Rating", e)}
                        value="4" checked={this.state.makeReview.Rating === "4"}/><label htmlFor="star4" title="Pretty good">4 stars</label>
                        <input type="radio" id="star3" name="Rating" onChange={(e)=>this.handleOnchange("Rating", e)}
                        value="3" checked={this.state.makeReview.Rating === "3"} /><label htmlFor="star3" title="Meh">3 stars</label>
                        <input type="radio" id="star2" name="Rating" onChange={(e)=>this.handleOnchange("Rating", e)}
                        value="2" checked={this.state.makeReview.Rating === "2"}/><label htmlFor="star2" title="Kinda bad">2 stars</label>
                        <input type="radio" id="star1" name="Rating" onChange={(e)=>this.handleOnchange("Rating", e)}
                        value="1" checked={this.state.makeReview.Rating === "1"}/><label htmlFor="star1" title="Sucks big time">1 star</label>
                    </fieldset>
                    <textarea ref="ReviewText" id="ReviewText" onChange={(e)=>this.handleOnchange("ReviewText", e)}
                    value={makeReview.ReviewText} name="ReviewText" placeholder="enter comment"></textarea><br />
                        <button type="Submit">Send</button>
                    </form>
                 </div>
                 <div className="reviews">
                    {getReviewsByProductId.map((item, index) =>
                        <div key={index.toString()}>
                            <ul>
                                <li><strong>Customer</strong> {item.Name}</li>
                                <li>{item.Rating}/5 stars</li>
                                <li>{item.ReviewText}</li>
                            </ul>
                        </div>
                     )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.items,
    reviews: state.reviews,
    loading: state.loading,
    error: state.error
});

export default connect(mapStateToProps)(Reviews);