import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Components
import App from './components/App';

// Reducers
import rootReducer from './rootReducer';

// Получаем предварительное состояние от сервера
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

// Redux-store
const store = createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

ReactDOM.hydrate(
  <Router>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </Router>,
  document.getElementById('root')
);
