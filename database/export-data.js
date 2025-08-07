// Data export script for Supabase to MongoDB migration
// Run with: node database/export-data.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = "https://geckkosfbfuowgstexiv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlY2trb3NmYmZ1b3dnc3RleGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4Nzg1NzEsImV4cCI6MjA2NDQ1NDU3MX0.obuifrPAEa54o81P0erEpYjw9oJpyEjmBrL98qTNasY";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function exportTable(tableName) {
  console.log(`Exporting ${tableName}...`);
  
  const { data, error } = await supabase
    .from(tableName)
    .select('*');
  
  if (error) {
    console.error(`Error exporting ${tableName}:`, error);
    return;
  }
  
  // Convert UUID to string for MongoDB compatibility
  const mongoData = data.map(item => ({
    ...item,
    // Convert PostgreSQL UUIDs to strings
    _id: item.id,
    // Remove the original id field
    ...Object.fromEntries(
      Object.entries(item).filter(([key]) => key !== 'id')
    )
  }));
  
  const filePath = path.join(__dirname, `exports/${tableName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(mongoData, null, 2));
  console.log(`✓ ${tableName} exported to ${filePath}`);
}

async function exportAllData() {
  // Create exports directory
  const exportsDir = path.join(__dirname, 'exports');
  if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir);
  }
  
  const tables = ['blogs', 'news', 'media', 'members', 'admin_users'];
  
  for (const table of tables) {
    await exportTable(table);
  }
  
  console.log('\n✓ All data exported successfully!');
  console.log('Next steps:');
  console.log('1. Set up MongoDB instance');
  console.log('2. Run the import script to load data into MongoDB');
  console.log('3. Update application code to use MongoDB');
}

exportAllData().catch(console.error);