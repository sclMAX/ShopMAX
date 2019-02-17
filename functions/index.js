const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

function getUser(uid) {
  const db = admin.firestore();
  return db.doc(`users/${uid}`).get().then(data => {
    console.log('USER:', data.data());
    return data;
  });
}

// build multiple CRUD interfaces:
app.post('/:uid/:orden', (req, res) => {
  const uid = req.params['uid'];
  const orden = req.params['orden'];
  getUser(uid).then().catch();
  console.log('uid:', uid);
  const token = req.body.token;
  console.log('token:', token);
  const payment_method_id = req.body.payment_method_id;
  console.log('payment_method_id:', payment_method_id);
  const installments = Number(req.body.installments);
  console.log('installments:', installments);
  const issuer_id = req.body.issuer_id;
  console.log('issuer_id:', issuer_id);
  if (req) {
    var mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken(
      'TEST-3257709747412373-012413-9b459b2bb667535ea246a09be2ed50f9-24703435');

    var payment_data = {
      transaction_amount: 192,
      token: token,
      description: 'Sleek Steel Shirt',
      installments: installments,
      payment_method_id: payment_method_id,
      issuer_id: issuer_id,
      payer: { email: 'maxisoftman@gmail.com' }
    };

    // Guarda y postea el pago
    mercadopago.payment.save(payment_data)
      .then((data) => {
        // ...
        // Imprime el estado del pago
        console.log(data.body);
        res.redirect(`https://shopmax.firebaseapp.com/procesar-pago/${data.body}`);
        return data;
      })
      .catch((error) => {
        // ...
        console.log('ERROR:', error);
      });
  } else {
    res.send('ERROR');
  }
});

// Expose Express API as a single Cloud Function:
exports.procesarpago = functions.https.onRequest(app);


