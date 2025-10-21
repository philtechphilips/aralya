# Supabase Setup Guide for Aralya

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `aralya-schools`
   - Database Password: (create a strong password)
   - Region: Choose closest to your users
6. Click "Create new project"

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - Project URL
   - Anon public key

## 3. Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Database Schema

Run this SQL in your Supabase SQL Editor to create the schools table:

```sql
-- Create schools table
CREATE TABLE schools (
  id SERIAL PRIMARY KEY,
  school_name TEXT NOT NULL,
  min_tuition TEXT,
  max_tuition TEXT,
  tuition_notes TEXT,
  grade_levels_offered TEXT,
  class_size_notes TEXT,
  curriculum_type TEXT,
  class_schedule TEXT,
  extra_programs_elective TEXT,
  after_school_cares TEXT,
  admission_requirements TEXT,
  scholarships_discounts TEXT,
  special_education_support TEXT,
  language_used TEXT,
  school_bus_note TEXT,
  accreditations_affiliations TEXT,
  logo_banner TEXT,
  website TEXT,
  facebook TEXT,
  contact_number TEXT,
  email TEXT,
  city TEXT,
  preschool_levels_offered TEXT,
  curriculum_tags TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better search performance
CREATE INDEX idx_schools_city ON schools(city);
CREATE INDEX idx_schools_curriculum_tags ON schools(curriculum_tags);
CREATE INDEX idx_schools_school_name ON schools(school_name);

-- Enable Row Level Security (RLS)
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON schools
  FOR SELECT USING (true);
```

## 5. Data Migration

After setting up the database, you can migrate your existing data using the Supabase Studio interface or programmatically.

## 6. Using Supabase Studio

Once set up, you can:

1. **View Data**: Go to Table Editor in Supabase Studio
2. **Add Schools**: Use the "Insert" button to add new schools
3. **Edit Schools**: Click on any row to edit school information
4. **Search/Filter**: Use the built-in search and filter capabilities
5. **Bulk Operations**: Import/export data using CSV files
6. **Real-time Updates**: Changes are reflected immediately in your app

## 7. Benefits of Using Supabase Studio

- **Visual Data Management**: Easy-to-use interface for non-technical users
- **Real-time Updates**: Changes appear instantly in your application
- **Data Validation**: Built-in validation and constraints
- **Backup & Recovery**: Automatic backups and point-in-time recovery
- **Analytics**: Built-in analytics and monitoring
- **API Generation**: Automatic REST and GraphQL APIs
- **Authentication**: Built-in user authentication if needed later
