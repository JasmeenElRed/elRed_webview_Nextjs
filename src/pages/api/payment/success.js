// pages/api/redirect.js

export default function handler(req, res) {
    res.redirect(307, '/payment/success');
  }
  