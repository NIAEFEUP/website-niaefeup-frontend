import type { RequestEvent } from '@sveltejs/kit';
import { PUT } from '@/routes/api/[...endpoint]/+server.js';

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
      console.log(imageFile.name);
      form.append('image', imageFile);
    }

    const thumbnailFile = formData.get('thumbnail');
    if (thumbnailFile instanceof File && thumbnailFile.size > 0) {
      console.log(thumbnailFile.name);
      form.append('thumbnail', thumbnailFile);
    }

    async function uploadImage(idProject: string, file: File) {
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch(`/api/projects/${idProject}/gallery`, {
        method: 'PUT',
        body: formData
      });
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Uploaded project:', data);
    }

    formData.getAll('gallery').forEach((galleryFile) => {
      if (galleryFile instanceof File && galleryFile.size > 0) {
        form.append('gallery', galleryFile);
        console.log(galleryFile.name);
        uploadImage(id, galleryFile);
      }
    });

    const success = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      body: form
    }).then((res) => res.ok);

    return success;
  }
};
