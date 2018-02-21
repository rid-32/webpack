import express from 'express';
import { createServer } from 'http';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

// Components
import App from './client/components/App';

const app = express();
const server = createServer(app);
const port = process.env.PORT || 3000;

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050/' : '/';

app.use(express.static(path.resolve(__dirname, '../')));

app.use('/*', (req, res) => {
  const context = {};

  const componentHTML = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
    </StaticRouter>
  );

  return res.end(renderHTML(componentHTML));
});

function renderHTML(componentHTML) {
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
        <script src="${assetUrl}public/assets/bundle.js"></script>
      </body>
    </html>
  `;
}

server.listen(port, () => console.log(`Server is listening on port: ${port}`));
