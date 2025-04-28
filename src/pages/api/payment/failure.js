export default function handler(req, res) {
    res.redirect(307, '/payment/failure');
  }

  console.log('failed....')