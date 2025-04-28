// // pages/api/redirect.js

// export default function handler(req, res) {
//     res.redirect(307, '/payment/success');
//   }
  

// pages/api/redirect.js

export default function handler(req, res) {
    if (req.method === 'POST') {
      // If it's a POST request, redirect to /payment/success
      res.redirect(307, '/payment/success');
    } else {
      // If it's not a POST request, send 405 Method Not Allowed
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  