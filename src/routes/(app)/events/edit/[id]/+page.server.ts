import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const res = await fetch(`/api/events/${params.id}`);
  if (!res.ok) error(res.status, 'Event not found');
  const event = await res.json();
  return { event };
};

export const actions = {
  default: async ({ params, request, fetch }: RequestEvent) => {
    const data = await request.formData();

    const title = data.get('Title');
    const slug = data.get('Slug');
    const description = data.get('Description');
    const start = new Date(data.get('DateStart') as string);
    const end = new Date(data.get('DateEnd') as string);

    const startJson = `${start.getDate()}-${start.getMonth()}-${start.getFullYear()} ${start.getHours()}:${start.getMinutes()}`;
    const endJson = `${end.getDate()}-${end.getMonth()}-${end.getFullYear()} ${end.getHours()}:${end.getMinutes()}`;
    const signUp = data.get('SignUp');
    const place = data.get('Place');
    const image = data.get('image') as File;

    const value = {
      title: title,
      description: description,
      slug: slug,
      registerUrl: signUp,
      dateInterval: {
        startDate: start,
        endDate: end
      },
      location: place
    };

    const json = JSON.stringify(value);
    const blob = new Blob([json], { type: 'application/json' });
    const form = new FormData();
    form.append('event', blob);
    value;
    if (image && image.size != 0) form.append('image', image, image.name);

    const success = await fetch(`/api/events/${params.id}`, {
      method: 'PUT',
      body: form
    }).then((res) => res.ok);

    return success;
  }
};
