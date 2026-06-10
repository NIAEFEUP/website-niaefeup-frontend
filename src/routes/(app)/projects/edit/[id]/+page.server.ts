import { error } from '@sveltejs/kit';

import type { RequestEvent } from '@sveltejs/kit';

const resolveNumericProjectId = async (
  routeParam: string,
  fetch: RequestEvent['fetch']
): Promise<number> => {
  const parsedId = Number(routeParam);
  if (Number.isInteger(parsedId) && parsedId > 0) {
    return parsedId;
  }

  const projectRes = await fetch(`/api/projects/${routeParam}`);
  if (!projectRes.ok) {
    error(projectRes.status, 'Project not found');
  }

  const project = await projectRes.json();
  if (!project || typeof project.id !== 'number') {
    error(500, 'Project id is missing or invalid');
  }

  return project.id;
};

export const actions = {
  default: async ({ request, params, fetch }: RequestEvent) => {
    const formData: FormData = await request.formData();
    const routeParam = params.id;
    if (!routeParam) {
      error(400, 'Project identifier is missing');
    }

    const id = await resolveNumericProjectId(routeParam, fetch);

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

    const thumbnailFile = formData.get('thumbnail');
    if (thumbnailFile instanceof File && thumbnailFile.size > 0) {
      form.append('thumbnail', thumbnailFile);
    }

    const imagesToDelete = formData.getAll('gallery_to_delete');
    for (const imageUrl of imagesToDelete) {
      if (typeof imageUrl !== 'string' || imageUrl.length === 0) continue;

      const deleteFormData = new FormData();
      deleteFormData.append('imageUrl', imageUrl);

      const deleteRes = await fetch(`/api/projects/${id}/gallery`, {
        method: 'DELETE',
        body: deleteFormData
      });
      if (!deleteRes.ok) return false;
    }

    const galleryFiles = formData.getAll('gallery');
    for (const galleryFile of galleryFiles) {
      if (!(galleryFile instanceof File) || galleryFile.size === 0) continue;

      const uploadFormData = new FormData();
      uploadFormData.append('image', galleryFile);

      const uploadRes = await fetch(`/api/projects/${id}/gallery`, {
        method: 'PUT',
        body: uploadFormData
      });
      if (!uploadRes.ok) return false;
    }

    const response = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      body: form
    });

    return response.ok;
  }
};
