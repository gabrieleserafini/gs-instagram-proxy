const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/proxy', createProxyMiddleware({
  target: 'https://scontent-atl3-1.cdninstagram.com',
  changeOrigin: true,
  pathRewrite: {
    '^/proxy': '',
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log('Proxying request to:', req.url);
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  },
  onError: (err, req, res) => {
    console.error('Error proxying request:', err);
    res.status(500).send('Proxy error');
  }
}));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
