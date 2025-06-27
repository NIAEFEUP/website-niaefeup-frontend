import type { RequestEvent } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, fetch }: RequestEvent) => {
    const data = await request.formData();

    const title = data.get('Title');
    const slug = data.get('Slug');
    const description = data.get('Description');
    const start = new Date(data.get('DateStart') as string);
    const end = new Date(data.get('DateEnd') as string);

    const startJson = `${start.getDay()}-${start.getMonth()}-${start.getFullYear()} ${start.getHours()}:${start.getMinutes()}`;
    const endJson = `${end.getDay()}-${end.getMonth()}-${end.getFullYear()} ${end.getHours()}:${end.getMinutes()}`;
    const signUp = data.get('SignUp')? data.get('SignUp') : null ;
    const place = data.get('Place')? data.get('Place') : null;
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
    form.append('image', image, image.name);
    console.log(value);
    const success = await fetch(`/api/events`, {
      method: 'POST',
      body: form
    }).then((res) => res.ok);

    return success;
  }
};
