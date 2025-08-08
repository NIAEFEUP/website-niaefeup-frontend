import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { canEdit } from '@/lib/api/permissions';

export const load: PageLoad = async ({ fetch }) => {
  if (!(await canEdit())) {
    throw redirect(303, '/');
  }

  const tech = await fetch(`${PUBLIC_API_URL}/technologies`);
  if (!tech.ok) {
    if (tech.status === 404) {
      error(404, 'No technologies found');
    } else {
      error(tech.status, 'Failed to load technologies');
    }
  }

  const technologies = await tech.json();

  return { technologies };
};

export const actions = {
  deleteTechnology: async ({ request, fetch }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    const res = await fetch(`/api/technologies/${id}`, {
      method: 'DELETE'
    });

    return { success: res.ok };
  },
  addTechnology: async ({ request, fetch }) => {
    const data = await request.formData();

    const formData = new FormData();

    formData.append(
      'dto',
      new Blob(
        [
          JSON.stringify({
            name: data.get('name'),
            url: data.get('url')
          })
        ],
        { type: 'application/json' }
      )
    );
    formData.append('image', data.get('image'));

    const res = await fetch(`/api/technologies`, {
      method: 'POST',
      body: formData
    });

    const json = await res.json();

    return { success: res.ok, data: json };
  }
};
