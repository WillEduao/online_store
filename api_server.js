const express = require('express');
const cors = require('cors');
require('dotenv').config();   
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');

const app = express();

const apiRoutes = require('./routes/api');

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

app.use('/api', apiRoutes);

app.get('/api/env-config', (req, res) => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_SECRET_KEY } = process.env;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Alguma variável de ambiente não está definida' });
  }

  res.status(200).json({
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
    stripePublicKey: STRIPE_SECRET_KEY
  });
});

app.post('/api/pagamento', async (req, res) => {
  const { amount, token } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount,
      currency: 'brl',
      description: 'Compra simulada com cartão de crédito',
      source: token,
    });

    res.json({ success: true, charge });
  } catch (error) {
    console.error('Erro no pagamento:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

const HOST = '0.0.0.0';
const PORT = 3000;

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
