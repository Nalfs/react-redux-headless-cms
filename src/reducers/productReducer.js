import {
    FETCH_PRODUCTS_BEGIN,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    SortingMethods,
    SET_SORT_METHOD,
    MAKE_NEW_REVIEW,
    FETCH_CURRENT_REVIEW,
    FETCH_REVIEW_BEGIN,
    MAKE_NEW_ORDER,
    ITEM_CART,
    ITEM_CART_CLEAR
  } from '../actions/productActions';

const initialState = {
    items: [],
    loading: false,
    error: null,
    sort: SortingMethods.SORT_NONE,
    reviews: [],
    orders: [],
    cart: JSON.parse(localStorage.getItem("cartItems")) || []
};

export default function productReducer(state = initialState, action) {

    switch(action.type) {
      case FETCH_PRODUCTS_BEGIN:
        state.items = []
        return {
          ...state,
          loading: true,
          error: null
        };

      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          items: action.payload.products
        };

      case FETCH_PRODUCTS_FAILURE:
        // The request failed, but it did stop, so set loading to "false".
        // Save the error, and we can display it somewhere
        // Since it failed, we don't have items to display anymore, so set it empty.
        // This is up to you and your app though: maybe you want to keep the items
        // around! Do whatever seems right.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };

        case SET_SORT_METHOD:
        return {
          ...state,
          sort: action.sortingMethod
        };

        case MAKE_NEW_REVIEW:
        return {
          ...state,
          loading: false,
          reviews: action.payload
        };

        case FETCH_REVIEW_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };

        case FETCH_CURRENT_REVIEW:
        return {
          ...state,
          loading: false,
          reviews: action.payload.rev
        }
        case MAKE_NEW_ORDER:
        return {
          ...state,
          loading: false,
          orders: action.payload
        }
        case ITEM_CART:
        return {
          ...state,
          cart: [
            ...state.cart,
            action.product
          ]
        }
        case ITEM_CART_CLEAR:
        return {
          ...state,
          loading: false,
          error: action.product,
          cart: []
        };
        default:
        return state;
    }
  }