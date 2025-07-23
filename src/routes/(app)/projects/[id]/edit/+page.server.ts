import type { RequestEvent } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, params, fetch }: RequestEvent) => {
    const formData: FormData = await request.formData();
    const id = params.id;
    const googlePlay = formData.get('googleplay');
    const appStore = formData.get('appstore');

    const value = {
      title: formData.get('title'),
      description: formData.get('description'),
      slug: formData.get('slug'),
      isArchived: false,
      slogan: formData.get('slogan'),
      targetAudience: formData.get('targetaudience'),
      links: [{ url: googlePlay }, { url: appStore }],
      addFile: formData.get('addFile')
    };

    const json = JSON.stringify(value);
    const blob = new Blob([json], { type: 'application/json' });
    const form = new FormData();
    form.append('project', blob);

    const success = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      body: form
    }).then((res) => res.ok);

    return success;
  }
};
