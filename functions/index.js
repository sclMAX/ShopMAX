const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest(
    (request, response) => { response.send("Hello from Firebase!"); });

const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));


// build multiple CRUD interfaces:
app.post('/:id', (req, res) => {
  console.log(req.params[0]);
  const token = req.body.token;
  const payment_method_id = req.body.payment_method_id;
  const installments = Number(req.body.installments);
  const issuer_id = req.body.issuer_id;
  if (req) {
    console.log('Token', token);
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
      payer: {email: 'maxisoftman@gmail.com'}
    };

    // Guarda y postea el pago
    mercadopago.payment.save(payment_data)
        .then(function(data) {
          // ...
          // Imprime el estado del pago
          console.log(data);
          res.redirect(`http://localhost:8100/articulos/${JSON.stringify(data.status)}`);
          res.send(`<!DOCTYPE html>
                    <html lang="es">
                    <body>
                    <pre>${JSON.stringify(data.body)}</pre>
                    </body>
                    </html>`);
        })
        .catch(function(error) {
          // ...
          console.log('ERROR:', error);
        });
  } else {
    res.send('ERROR');
  }
});

// Expose Express API as a single Cloud Function:
exports.procesarpago = functions.https.onRequest(app);
