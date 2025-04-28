export default function handler(req, res) {
    res.redirect(307, '/payment/success'); // 307 = Temporary Redirect (keeps POST if needed)
  }

  console.log('test')