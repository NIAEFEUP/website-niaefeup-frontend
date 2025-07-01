import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const res = await fetch(`/api/events/${params.slug}`);
  if (!res.ok) {
    console.log('Error fetching event:', res.status, res.statusText);
    throw error(res.status, 'Event not found');
  }
  
  const event = await res.json();
  return { event };
}