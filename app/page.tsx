import { supabase } from './lib/supabase';
import BentoGridWrapper from './BentoGridWrapper';

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
  return <BentoGridWrapper courses={courses} />;
}