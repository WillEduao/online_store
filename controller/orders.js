const { supabase } = require('../config');

exports.createOrder = async function (req, res) {
  try {
    const payload = req.body;

    const flatPayload = {
      ...payload,
      ...payload.billingAddress,
      billingAddress: undefined,
    };

    const { data, error } = await supabase
      .from('orders')
      .insert([flatPayload]);

    if (error) {
      console.error('Erro ao salvar order:', error.message);
      return res.status(500).json({ erro: error.message });
    }

    return res.status(201).json({ message: 'Compra salva com sucesso', data });
  } catch (err) {
    console.error('Erro interno createOrder:', err);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};
