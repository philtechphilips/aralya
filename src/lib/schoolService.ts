import { supabase, School } from './supabase'

export class SchoolService {
  // Get all schools
  static async getAllSchools(): Promise<School[]> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .order('school_name')
    
    if (error) {
      console.error('Error fetching schools:', error)
      throw error
    }
    
    return data || []
  }

  // Get school by ID
  static async getSchoolById(id: number): Promise<School | null> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching school:', error)
      return null
    }
    
    return data
  }

  // Search schools
  static async searchSchools(query: string): Promise<School[]> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .or(`school_name.ilike.%${query}%, city.ilike.%${query}%, curriculum_tags.ilike.%${query}%`)
      .order('school_name')
    
    if (error) {
      console.error('Error searching schools:', error)
      throw error
    }
    
    return data || []
  }

  // Get schools by city
  static async getSchoolsByCity(city: string): Promise<School[]> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('city', city)
      .order('school_name')
    
    if (error) {
      console.error('Error fetching schools by city:', error)
      throw error
    }
    
    return data || []
  }

  // Get schools by curriculum
  static async getSchoolsByCurriculum(curriculum: string): Promise<School[]> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .contains('curriculum_tags', curriculum)
      .order('school_name')
    
    if (error) {
      console.error('Error fetching schools by curriculum:', error)
      throw error
    }
    
    return data || []
  }

  // Add new school
  static async addSchool(school: Omit<School, 'id' | 'created_at' | 'updated_at'>): Promise<School> {
    const { data, error } = await supabase
      .from('schools')
      .insert([school])
      .select()
      .single()
    
    if (error) {
      console.error('Error adding school:', error)
      throw error
    }
    
    return data
  }

  // Update school
  static async updateSchool(id: number, updates: Partial<School>): Promise<School> {
    const { data, error } = await supabase
      .from('schools')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating school:', error)
      throw error
    }
    
    return data
  }

  // Delete school
  static async deleteSchool(id: number): Promise<void> {
    const { error } = await supabase
      .from('schools')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting school:', error)
      throw error
    }
  }

  // Get featured schools (first 3)
  static async getFeaturedSchools(): Promise<School[]> {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .order('school_name')
      .limit(3)
    
    if (error) {
      console.error('Error fetching featured schools:', error)
      throw error
    }
    
    return data || []
  }

  // Get unique cities
  static async getUniqueCities(): Promise<string[]> {
    const { data, error } = await supabase
      .from('schools')
      .select('city')
      .order('city')
    
    if (error) {
      console.error('Error fetching cities:', error)
      throw error
    }
    
    // Extract unique cities
    const uniqueCities = [...new Set(data?.map(item => item.city) || [])]
    return uniqueCities
  }

  // Get unique curriculum tags
  static async getUniqueCurriculumTags(): Promise<string[]> {
    const { data, error } = await supabase
      .from('schools')
      .select('curriculum_tags')
    
    if (error) {
      console.error('Error fetching curriculum tags:', error)
      throw error
    }
    
    // Extract and flatten all curriculum tags
    const allTags = data?.flatMap(item => 
      item.curriculum_tags?.split(', ').map((tag: string) => tag.trim()) || []
    ) || []
    
    return [...new Set(allTags)].sort()
  }

  // Get school count by city
  static async getSchoolCountByCity(city: string): Promise<number> {
    const { count, error } = await supabase
      .from('schools')
      .select('*', { count: 'exact', head: true })
      .eq('city', city)
    
    if (error) {
      console.error('Error getting school count by city:', error)
      throw error
    }
    
    return count || 0
  }

  // Search cities by query with school counts
  static async searchCities(query: string): Promise<{ city: string; schoolCount: number }[]> {
    if (query.trim().length === 0) {
      const cities = await this.getUniqueCities()
      const citiesWithCounts = await Promise.all(
        cities.map(async (city) => ({
          city,
          schoolCount: await this.getSchoolCountByCity(city)
        }))
      )
      return citiesWithCounts
    }

    const { data, error } = await supabase
      .from('schools')
      .select('city')
      .ilike('city', `%${query}%`)
      .order('city')
    
    if (error) {
      console.error('Error searching cities:', error)
      throw error
    }
    
    // Extract unique cities from results
    const uniqueCities = [...new Set(data?.map(item => item.city) || [])]
    
    // Get school counts for each city
    const citiesWithCounts = await Promise.all(
      uniqueCities.map(async (city) => ({
        city,
        schoolCount: await this.getSchoolCountByCity(city)
      }))
    )
    
    return citiesWithCounts
  }
}
