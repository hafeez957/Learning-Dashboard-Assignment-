import { supabase } from './lib/supabase';
import DashboardContent from './components/dashboard-content';

async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Supabase error:', error);
    return [];
  }
  return data || [];
}

export default async function Home() {
  const courses = await getCourses();
  return <DashboardContent courses={courses} />;
}