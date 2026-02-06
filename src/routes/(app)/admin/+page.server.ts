import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Technology } from '@/types/technology';
import type { Role } from '@/types/role';
import { canEditActivity, canCreateActivity, canDeleteActivity } from '@/lib/api/permissions';
import type { BackendError } from '@/types/backend-error';

export const load: PageServerLoad = async ({ fetch }) => {
  if (!(await canEditActivity(fetch))) {
    throw redirect(303, '/');
  }

  const tech = await fetch('/api/technologies');
  if (!tech.ok) {
    if (tech.status === 404) {
      return { technologies: [] };
    } else {
      error(tech.status, 'Failed to load technologies');
    }
  }

  const technologies: Technology[] = await tech.json();

  const role = await fetch('/api/roles');
  if (!role.ok) {
    if (role.status === 404) {
      return { roles: [] };
    } else {
      error(role.status, 'Failed to load roles');
    }
  }

  const roles: Role[] = await role.json();

  return { technologies, roles };
};

export const actions: Actions = {
  deleteTechnology: async ({ request, fetch }) => {
    if (!(await canDeleteActivity(fetch))) {
      throw redirect(303, '/');
    }

    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      error(400, 'Invalid technology ID');
    }

    const res = await fetch(`/api/technologies/${id}`, {
      method: 'DELETE'
    });

    return { success: res.ok };
  },

  addTechnology: async ({ request, fetch }) => {
    if (!(await canCreateActivity(fetch))) {
      throw redirect(303, '/');
    }

    const requestData = await request.formData();

    const name = requestData.get('name');
    const url = requestData.get('url');
    const image = requestData.get('image');

    if (!name || typeof name !== 'string') {
      error(400, 'Technology name is required');
    }

    if (!url || typeof url !== 'string') {
      error(400, 'Technology URL is required');
    }

    const formData = new FormData();

    formData.append('dto', new Blob([JSON.stringify({ name, url })], { type: 'application/json' }));

    if (image && image instanceof File) {
      formData.append('image', image);
    }

    const res = await fetch(`/api/technologies`, {
      method: 'POST',
      body: formData
    });

    const json: (Technology & { errors?: BackendError[] }) | { errors: BackendError[] } =
      await res.json();

    return { success: res.ok, data: json };
  },

  addRole: async ({ request, fetch }) => {
    const formData = await request.formData();
    const name = formData.get('name');

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return { success: false, error: 'O nome da role é obrigatório' };
    }

    const res = await fetch('/api/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.trim(),
        permissions: [],
        isSection: false,
        associatedActivities: []
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message = errorData.message || errorData.errors?.[0]?.message || 'Erro ao criar role';
      return { success: false, error: message };
    }

    const newRole: Role = await res.json();
    return { success: true, data: newRole };
  }
};
