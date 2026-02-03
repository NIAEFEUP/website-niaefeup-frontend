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

    const thumbnailFile = formData.get('thumbnail');
    if (thumbnailFile instanceof File && thumbnailFile.size > 0) {
      form.append('thumbnail', thumbnailFile);
    }

    const imagesToDelete = formData.getAll('gallery_to_delete');
    const deletePromises = imagesToDelete.map((imageUrl) => {
      if (typeof imageUrl === 'string' && imageUrl.length > 0) {
        const deleteFormData = new FormData();
        deleteFormData.append('imageUrl', imageUrl);
        
        return fetch(`/api/projects/${id}/gallery`, {
            method: 'DELETE',
            body: deleteFormData
        });
      }
    });
    await Promise.all(deletePromises);

    const galleryFiles = formData.getAll('gallery');
    const uploadPromises = galleryFiles.map((galleryFile) => {
      if (galleryFile instanceof File && galleryFile.size > 0) {
        const uploadFormData = new FormData();
        uploadFormData.append('image', galleryFile);
        
        return fetch(`/api/projects/${id}/gallery`, {
          method: 'PUT',
          body: uploadFormData
        }).then(res => {
            if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
            return res.json();
        });
      }
    });
    await Promise.all(uploadPromises);

    const response = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      body: form
    });

    return response.ok;
  }
};