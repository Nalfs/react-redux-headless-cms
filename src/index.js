import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import App from './app';

// import registerServiceWorker from './registerServiceWorker';
import productReducer from './reducers/productReducer';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
const store = createStore(productReducer, composeWithDevTools(
  applyMiddleware(thunk)
  ));

  store.subscribe(() => {
    localStorage.setItem("cartItems", JSON.stringify(store.getState().cart));
  });

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
      <App />
  </BrowserRouter>
  </Provider>
    ,
    document.getElementById('root')
);
// registerServiceWorker();
