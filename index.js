const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/proxy', createProxyMiddleware({
  target: 'https://scontent-atl3-1.cdninstagram.com',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy': '',
  },
}));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
