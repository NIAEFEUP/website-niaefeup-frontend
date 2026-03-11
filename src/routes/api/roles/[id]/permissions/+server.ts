import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ params, request }) => {
  const roleId = params.id;
  const { permission, action, activityId } = await request.json();

  try {
    const method = action === 'grant' ? 'POST' : 'DELETE';

    const bodyPayload = JSON.stringify({ permissions: [permission] });

    const BACKEND_URL = 'http://localhost:8080';
    let springBootUrl = '';

    if (!activityId) {
      springBootUrl = `${BACKEND_URL}/roles/${roleId}/permissions`;
    } else {
      springBootUrl = `${BACKEND_URL}/roles/${roleId}/activities/${activityId}/permissions`;
    }

    const res = await globalThis.fetch(springBootUrl, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: bodyPayload
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return json(
        { success: false, error: errorData.message || 'Erro do backend' },
        { status: res.status }
      );
    }

    return json({ success: true });
  } catch (err) {
    console.error('Erro no proxy de permissões:', err);
    error(500, 'Erro de comunicação com o servidor');
  }
};
