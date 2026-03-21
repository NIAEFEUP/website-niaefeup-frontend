import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchWithAuth } from '@/routes/api/[...endpoint]/proxy';

export const PUT: RequestHandler = async ({ params, request, cookies }) => {
  const roleId = params.id;
  const { permission, action, activityId } = await request.json();

  try {
    const method = action === 'grant' ? 'POST' : 'DELETE';

    const bodyPayload = JSON.stringify({ permissions: [permission] });

    const apiPath = !activityId
      ? `/roles/${roleId}/permissions`
      : `/roles/${roleId}/activities/${activityId}/permissions`;

    const res = await fetchWithAuth(
      cookies,
      apiPath,
      method,
      { 'Content-Type': 'application/json' },
      bodyPayload
    );

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
