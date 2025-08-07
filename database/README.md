# Database Migration Guide: Supabase to MongoDB

## Overview
This guide provides step-by-step instructions for migrating from Supabase PostgreSQL to MongoDB.

## Prerequisites
- MongoDB instance (local or cloud)
- Node.js environment
- Access to current Supabase project

## Migration Steps

### 1. Setup MongoDB
```bash
# Install MongoDB locally or use MongoDB Atlas
# Create a new database (e.g., "ngo_website")
```

### 2. Install MongoDB Dependencies
```bash
npm install mongodb mongoose
npm install --save-dev @types/mongodb
```

### 3. Data Export from Supabase
Use the provided export script to dump data:
```bash
node database/export-data.js
```

### 4. Update Environment Variables
Create new environment variables for MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/ngo_website
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ngo_website
```

### 5. Update Client Configuration
Replace Supabase client with MongoDB client:
```javascript
// Old: src/integrations/supabase/client.ts
// New: src/integrations/mongodb/client.ts
```

### 6. Update API Calls
Replace Supabase queries with MongoDB operations:

**Before (Supabase):**
```javascript
const { data, error } = await supabase
  .from('blogs')
  .select('*')
  .order('created_at', { ascending: false });
```

**After (MongoDB):**
```javascript
const blogs = await db.collection('blogs')
  .find({})
  .sort({ created_at: -1 })
  .toArray();
```

### 7. Authentication Migration
- Implement custom authentication or use services like Auth0
- Update admin login functionality
- Migrate existing admin users

### 8. File Storage Migration
- Move files from Supabase Storage to MongoDB GridFS or cloud storage
- Update file URLs in the database
- Update upload functionality

## Code Changes Required

### Files to Update:
1. `src/integrations/supabase/client.ts` → `src/integrations/mongodb/client.ts`
2. All components using Supabase queries
3. Admin panel components
4. Authentication logic
5. File upload components

### Key Considerations:
- MongoDB uses `_id` instead of `id`
- Date handling differences
- Query syntax changes
- No built-in RLS (implement in application layer)
- No real-time subscriptions (use MongoDB Change Streams)

## Testing
1. Test data migration integrity
2. Verify all CRUD operations
3. Test admin authentication
4. Test file uploads/downloads
5. Performance testing

## Rollback Plan
Keep Supabase project active during transition period for easy rollback if needed.

## Post-Migration
1. Update documentation
2. Monitor performance
3. Optimize queries as needed
4. Set up backups for MongoDB