import { supabase } from './lib/supabase';
import ClientWrapper from './ClientWrapper';

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
  // Data is fetched on the server, then passed to client component
  return <ClientWrapper courses={courses} />;
}