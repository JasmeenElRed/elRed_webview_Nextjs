// // pages/api/redirect.js

export default function handler(req, res) {
    res.redirect(301, '/payment/success');
}
  
