// Data import script for MongoDB
// Run with: node database/import-data.js

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Update this with your MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = 'ngo_website';

async function importTable(db, tableName) {
  const filePath = path.join(__dirname, `exports/${tableName}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  No export file found for ${tableName}`);
    return;
  }
  
  console.log(`Importing ${tableName}...`);
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (data.length === 0) {
    console.log(`⚠️  No data to import for ${tableName}`);
    return;
  }
  
  // Convert date strings to Date objects
  const processedData = data.map(item => ({
    ...item,
    created_at: item.created_at ? new Date(item.created_at) : new Date(),
    updated_at: item.updated_at ? new Date(item.updated_at) : new Date(),
    date: item.date ? new Date(item.date) : undefined
  }));
  
  const collection = db.collection(tableName);
  
  // Clear existing data (optional - remove if you want to preserve existing data)
  await collection.deleteMany({});
  
  const result = await collection.insertMany(processedData);
  console.log(`✓ ${tableName}: ${result.insertedCount} documents imported`);
}

async function importAllData() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DATABASE_NAME);
    
    const tables = ['blogs', 'news', 'media', 'members', 'admin_users'];
    
    for (const table of tables) {
      await importTable(db, table);
    }
    
    console.log('\n✓ All data imported successfully!');
    
    // Create indexes for better performance
    console.log('\nCreating indexes...');
    await db.collection('blogs').createIndex({ created_at: -1 });
    await db.collection('news').createIndex({ date: -1 });
    await db.collection('members').createIndex({ display_order: 1 });
    await db.collection('admin_users').createIndex({ email: 1 }, { unique: true });
    console.log('✓ Indexes created');
    
  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await client.close();
  }
}

importAllData().catch(console.error);