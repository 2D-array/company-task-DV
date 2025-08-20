const fs = require('fs');
const path = require('path');
const supabase = require('./config/supabase');

const importData = async () => {
  try {
    // Read the JSON file
    const jsonPath = path.join(__dirname, '..', 'jsondata.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    console.log(`Found ${jsonData.length} records to import...`);

    // Clean and prepare data for insertion
    const cleanData = jsonData.map(item => ({
      end_year: item.end_year || null,
      intensity: item.intensity || 0,
      sector: item.sector || null,
      topic: item.topic || null,
      insight: item.insight || null,
      url: item.url || null,
      region: item.region || null,
      start_year: item.start_year || null,
      impact: item.impact || null,
      added: item.added || null,
      published: item.published || null,
      country: item.country || null,
      relevance: item.relevance || 0,
      pestle: item.pestle || null,
      source: item.source || null,
      title: item.title || null,
      likelihood: item.likelihood || 0
    }));

    // Insert data in batches (Supabase has a limit on batch size)
    const batchSize = 100;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < cleanData.length; i += batchSize) {
      const batch = cleanData.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('dashboard_data')
        .insert(batch);

      if (error) {
        console.error(`Error inserting batch ${Math.floor(i/batchSize) + 1}:`, error);
        errorCount += batch.length;
      } else {
        console.log(`Successfully imported batch ${Math.floor(i/batchSize) + 1} (${batch.length} records)`);
        successCount += batch.length;
      }
    }

    console.log(`\nImport completed:`);
    console.log(`✅ Successful: ${successCount} records`);
    console.log(`❌ Failed: ${errorCount} records`);

  } catch (error) {
    console.error('Import failed:', error);
  }
};

// Run the import
importData();