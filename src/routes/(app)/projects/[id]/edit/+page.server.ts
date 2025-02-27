import type { RequestEvent } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, fetch }: RequestEvent) => {
    const data = await request.formData();
    const dummy = data.get('dummy');

    const success = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: dummy,
        password: 'test'
      })
    }).then((res) => res.ok);

    return success;
  }
};
