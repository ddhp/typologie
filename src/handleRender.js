import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './app'

function renderFullPage(html, preloadedState, entryName) {
  return `
  <!doctype html>
  <html>
  <head>
  <title>Typologie</title>
  <style type="text/css">
    .main {
      opacity: 0;
    }
  </style>
  </head>
  <body>
  <div id="app-mount-point">${html}</div>
  <script>
  </script>
  <script src="/static/js/${entryName}"></script>
  </body>
  </html>
  `
}

export default function (req, res) {
  // res.send(renderToString(
  //   <App />
  // ))
  const html = renderToString(
    <App />
  )
  // Send the rendered page back to the client
  res.send(renderFullPage(html, {}, req.entryPath.main.js/*, preloadedState*/)) 
}

// WARNING: See the following for security issues around embedding JSON in HTML:
// http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
// window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
