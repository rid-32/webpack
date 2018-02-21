import express from 'express';
import { createServer } from 'http';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Reducers
import rootReducer from './client/rootReducer';

// Components
import App from './client/components/App';

const app = express();
const server = createServer(app);
const port = process.env.PORT || 3000;

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050/' : '/';

app.use(express.static(path.resolve(__dirname, '../')));

app.use('/*', (req, res) => {
  const context = {};

  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );

  const preloadedState = store.getState();

  const componentHTML = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );

  return res.end(renderHTML(componentHTML, preloadedState));
});

function renderHTML(componentHTML, preloadedState) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>React Application</title>
        <link rel="stylesheet" href="${assetUrl}public/assets/style.css" />
      </head>
      <body>
        <div id="root">${componentHTML}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="${assetUrl}public/assets/bundle.js" defer></script>
      </body>
    </html>
  `;
}

server.listen(port, () => console.log(`Server is listening on port: ${port}`));
