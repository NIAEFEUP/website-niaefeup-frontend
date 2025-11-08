import type { RequestEvent } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, params, fetch }: RequestEvent) => {
    const formData: FormData = await request.formData();
    const id = params.id;

    const projectDto = {
      title: formData.get('title'),
      description: formData.get('description'),
      slug: formData.get('slug'),
      isArchived: false,
      slogan: formData.get('slogan'),
      targetAudience: formData.get('public'),
      github: formData.get('github')
    };

    const form = new FormData();

    const projectBlob = new Blob([JSON.stringify(projectDto)], {
      type: 'application/json'
    });
    form.append('project', projectBlob);

    const imageFile = formData.get('image');
    if (imageFile instanceof File && imageFile.size > 0) {
      form.append('image', imageFile);
    }

    const success = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      body: form
    }).then((res) => res.ok);

    return success;
  }
};
