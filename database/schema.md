# Database Schema Documentation

## Current Supabase Tables

### 1. blogs
```sql
CREATE TABLE public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  image_url TEXT
);
```

**MongoDB Equivalent:**
```javascript
{
  _id: ObjectId,
  title: String,
  category: String,
  content: String,
  excerpt: String,
  image_url: String,
  created_at: Date,
  updated_at: Date
}
```

### 2. news
```sql
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'normal'
);
```

**MongoDB Equivalent:**
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  date: Date,
  priority: String, // 'normal', 'high', 'urgent'
  created_at: Date,
  updated_at: Date
}
```

### 3. media
```sql
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL
);
```

**MongoDB Equivalent:**
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  file_url: String,
  file_type: String,
  created_at: Date
}
```

### 4. members
```sql
CREATE TABLE public.members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  introduction TEXT NOT NULL,
  achievements TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);
```

**MongoDB Equivalent:**
```javascript
{
  _id: ObjectId,
  name: String,
  designation: String,
  photo_url: String,
  introduction: String,
  achievements: String,
  display_order: Number,
  created_at: Date,
  updated_at: Date
}
```

### 5. admin_users
```sql
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);
```

**MongoDB Equivalent:**
```javascript
{
  _id: ObjectId,
  email: String,
  password_hash: String,
  created_at: Date
}
```

## Current RLS Policies

All tables have the following policies:
- Public can view (SELECT)
- Admin can manage (ALL operations)

This will need to be implemented at the application level in MongoDB.