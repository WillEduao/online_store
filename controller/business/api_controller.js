const { supabase } = require('../api_config');

exports.getAllProducts = async function (req, res) {
  try {
    const { data: produtos, error } = await supabase
      .from('products')
      .select('*')
      .limit(25);

    if (error) {
      console.error('Erro ao buscar produtos:', error.message);
      return res.status(500).json({ erro: error.message });
    }

    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro inesperado:', error);
    res.status(500).json({ erro: 'Erro inesperado ao buscar produtos' });
  }
};

exports.getEnvConfig = function (req, res) {
  const { SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_SECRET_KEY } = process.env;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Alguma variável de ambiente não está definida' });
  }

  res.status(200).json({
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
    stripePublicKey: STRIPE_SECRET_KEY
  });
};