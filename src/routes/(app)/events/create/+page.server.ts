import type { RequestEvent } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, fetch }: RequestEvent) => {
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

    const value: {
      title: FormDataEntryValue | null;
      description: FormDataEntryValue | null;
      slug: FormDataEntryValue | null;
      dateInterval: { startDate: string; endDate: string };
      registerUrl?: FormDataEntryValue | null;
      location?: FormDataEntryValue | null;
    } = {
      title,
      description,
      slug,
      dateInterval: { startDate: startJson, endDate: endJson }
    };

    if (signUp) value.registerUrl = signUp;
    if (place) value.location = place;

    const json = JSON.stringify(value);
    const blob = new Blob([json], { type: 'application/json' });
    const form = new FormData();
    form.append('event', blob);
    form.append('image', image, image.name);
    console.log(value);
    const success = await fetch(`/api/events`, {
      method: 'POST',
      body: form
    }).then((res) => res.ok);

    return success;
  }
};
