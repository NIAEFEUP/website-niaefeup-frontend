import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchWithAuth } from '@/routes/api/[...endpoint]/proxy';

export const PUT: RequestHandler = async ({ params, request, cookies }) => {
  const roleId = params.id;
  const { permission, action, activityId } = await request.json();

  // Input validation
  if (!['grant', 'revoke'].includes(action)) {
    return json(
      { success: false, error: "O campo 'action' deve ser 'grant' ou 'revoke'" },
      { status: 400 }
    );
  }

  if (!permission || typeof permission !== 'string' || permission.trim() === '') {
    return json(
      { success: false, error: "O campo 'permission' é obrigatório e deve ser uma string" },
      { status: 400 }
    );
  }

  let normalizedActivityId: string | number | null = null;
  if (activityId != null) {
    if (typeof activityId === 'string') {
      normalizedActivityId = activityId.trim();
      if (normalizedActivityId === '') {
        return json(
          { success: false, error: "O campo 'activityId' não pode ser vazio" },
          { status: 400 }
        );
      }
    } else if (typeof activityId === 'number') {
      normalizedActivityId = activityId;
    } else {
      return json({ success: false, error: "O campo 'activityId' é inválido" }, { status: 400 });
    }
  }

  try {
    const method = action === 'grant' ? 'POST' : 'DELETE';

    const bodyPayload = JSON.stringify({ permissions: [permission] });

    const apiPath =
      normalizedActivityId == null
        ? `/roles/${roleId}/permissions`
        : `/roles/${roleId}/activities/${normalizedActivityId}/permissions`;

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
