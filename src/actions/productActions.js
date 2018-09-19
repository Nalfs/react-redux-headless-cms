export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const SET_SORT_METHOD  = 'SET_SORT_METHOD';
export const MAKE_NEW_REVIEW = 'MAKE_NEW_REVIEW';
export const FETCH_REVIEW_BEGIN = 'FETCH_REVIEW_BEGIN';
export const FETCH_CURRENT_REVIEW = 'FETCH_CURRENT_REVIEW';
export const MAKE_NEW_ORDER = 'MAKE_NEW_ORDER';
export const ITEM_CART = 'ITEM_CART';
export const ITEM_CART_CLEAR = 'ITEM_CART_CLEAR';

export const SortingMethods = {
  SORT_PRICE_ASC: 'SORT_PRICE_ASC',
  SORT_PRICE_DESC: 'SORT_PRICE_DESC',
  SORT_QTY_ASC: 'SORT_QTY_ASC',
  SORT_QTY_DESC: 'SORT_QTY_DESC',
  SORT_NONE: 'SORT_NONE'
}

export const clearCart = product => ({
  type: ITEM_CART_CLEAR,
  product: product
})

export const fetchCart = product  => ({
  type: ITEM_CART,
  product: product
});

export const makeNewOrder = order => ({
  type: MAKE_NEW_ORDER,
  payload: { order }
});


export const makeNewReview = rev => ({
  type: MAKE_NEW_REVIEW,
  payload: { newReview: rev }
});

export const fetchReviewBegin = () => ({
  type: FETCH_REVIEW_BEGIN
});

export const fetchReviews = rev => ({
  type: FETCH_CURRENT_REVIEW,
  payload: { rev  }
});

export const setSortMethod = sortMethod => ({
  type: SET_SORT_METHOD,
  sortingMethod: sortMethod
});

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsError = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});


export function fetchProducts(query = '') {
  return dispatch => {
      dispatch(fetchProductsBegin());
      console.error("FETCH PRODUCTS", query)
      return fetch('http://localhost:1337/product' + query)
        .then(handleErrors)
        .then(res => res.json())
        .then(products => {
          console.error("FETCHING PRODUCTS", products)
          dispatch(fetchProductsSuccess(products));
        })
        .catch(error => dispatch(fetchProductsFailure(error)));

      };
}
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };




  export function getReview(makeReview) {
    const myHeader = {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(makeReview),
      method: 'POST'
    };
    return dispatch => {
      console.log("this is a review", makeReview)
      return fetch('http://localhost:1337/review', myHeader)
      .then(handleErrors)
      .then(res => res.json())
      .then(rev => {
        dispatch(fetchReview());
        console.log('This was a POST request', rev);
      })
      .catch((error) => {
        console.log(error)
      });
    };
  }

  export function fetchReview() {
    return dispatch => {

        return fetch('http://localhost:1337/review')
          .then(handleErrors)
          .then(res => res.json())
          .then(rev => {
            console.error("reviews", rev)
            dispatch(fetchReviews(rev));
          })
          .catch(error => dispatch(fetchProductsFailure(error)));

        };
  }

  export function postOrder(makeOrder) {
    const myHeader = {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(makeOrder),
      method: 'POST'
    };
    return dispatch => {
      console.log(makeOrder)
      return fetch('http://localhost:1337/order', myHeader)
      .then(handleErrors)
      .then(res => res.json())
      .then(order => {
        dispatch(makeNewOrder(order));
        console.log('This was a POST request', order);
        localStorage.clear();
        dispatch(clearCart());
      })
      .catch((error) => {
        console.log(error)
      });
    };
  }

