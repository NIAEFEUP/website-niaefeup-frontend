import type { RequestEvent } from '@sveltejs/kit';
import { error, fail } from '@sveltejs/kit';

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

    const startJson = `${start.getDate()}-${start.getMonth() + 1}-${start.getFullYear()} ${start.getHours()}:${start.getMinutes()}`;
    const endJson = `${end.getDate()}-${end.getMonth() + 1}-${end.getFullYear()} ${end.getHours()}:${end.getMinutes()}`;
    const signUp = data.get('SignUp');
    const place = data.get('Place');
    const image = data.get('image') as File;

    const value = {
      title: title,
      description: description,
      slug: slug,
      registerUrl: signUp,
      dateInterval: {
        startDate: startJson,
        endDate: endJson
      },
      location: place
    };

    const json = JSON.stringify(value);
    const blob = new Blob([json], { type: 'application/json' });
    const form = new FormData();
    form.append('event', blob);

    if (image && image.size > 0 && image.name !== '') {
      form.append('image', image, image.name);
    }

    try {
      const res = await fetch(`/api/events/${params.id}`, {
        method: 'PUT',
        body: form
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        let messages: string[] = [];

        if (Array.isArray(errorData.errors)) {
          messages = errorData.errors.map((error: { message: string }) => error.message);
        } else if (errorData.message) {
          messages = [errorData.message];
        } else {
          messages = ['Failed to edit event.'];
        }

        return fail(res.status, { errorMessage: messages });
      }

      return { success: true };
    } catch (err) {
      return fail(500, { errorMessage: 'Server error. Please try again.' });
    }
  }
};
