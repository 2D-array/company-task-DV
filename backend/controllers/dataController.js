const supabase = require('../config/supabase');

const getAllData = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('dashboard_data')
      .select('*');

    if (error) {
      console.error('Supabase error:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getFilteredData = async (req, res) => {
  try {
    const { 
      end_year, 
      topic, 
      sector, 
      region, 
      pestle, 
      source, 
      country,
      start_year
    } = req.query;

    let query = supabase.from('dashboard_data').select('*');

    // Apply filters if they exist and are not empty
    if (end_year && end_year !== '') {
      query = query.eq('end_year', end_year);
    }
    if (topic && topic !== '') {
      query = query.ilike('topic', `%${topic}%`);
    }
    if (sector && sector !== '') {
      query = query.ilike('sector', `%${sector}%`);
    }
    if (region && region !== '') {
      query = query.ilike('region', `%${region}%`);
    }
    if (pestle && pestle !== '') {
      query = query.ilike('pestle', `%${pestle}%`);
    }
    if (source && source !== '') {
      query = query.ilike('source', `%${source}%`);
    }
    if (country && country !== '') {
      query = query.ilike('country', `%${country}%`);
    }
    if (start_year && start_year !== '') {
      query = query.eq('start_year', start_year);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUniqueValues = async (req, res) => {
  try {
    const { column } = req.params;
    
    const { data, error } = await supabase
      .from('dashboard_data')
      .select(column);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(400).json({ error: error.message });
    }

    // Get unique values, filter out empty strings and nulls
    const uniqueValues = [...new Set(
      data
        .map(item => item[column])
        .filter(value => value !== null && value !== undefined && value !== '')
    )];
    
    res.json(uniqueValues);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllData,
  getFilteredData,
  getUniqueValues
};

//WtvzJuvUzvrQdnWw