import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const res = await fetch(`/api/accounts/${params.id}`);
  if (!res.ok) error(res.status, 'Account not found');
  const account = await res.json();
  return { account };
};

export const actions = {
  default: async ({ params, request, fetch }: RequestEvent) => {
    const data = await request.formData();
    const email = data.get('email');
    const name = data.get('name');
    const bio = data.get('bio');
    const birthDate = new Date(data.get('birthDate') as string);
    const birthDateJson = `${birthDate.getDate()}-${birthDate.getMonth() + 1}-${birthDate.getFullYear()} ${birthDate.getHours()}:${birthDate.getMinutes()}`;
    const linkedin = data.get('linkedin');
    const github = data.get('github');
    const photo = data.get('photo') as File;

    const isActive = data.get('isActive') === 'Membro Ativo' ? true : false;

    const accountValue = {
      email: email,
      name: name,
      bio: bio,
      birthDate: birthDateJson,
      linkedin: linkedin,
      github: github,
      isActive: isActive
    };

    const accountBlob = new Blob([JSON.stringify(accountValue)], { type: 'application/json' });
    const accountForm = new FormData();
    if (photo && photo.size !== 0) accountForm.append('photo', photo);
    accountForm.append('account', accountBlob);

    await fetch(`/api/accounts/${params.id}`, {
      method: 'PUT',
      body: accountForm
    });

    let existingWebsiteIds: number[] = [];

    const existingRes = await fetch(`/api/accounts/${params.id}`);
    if (existingRes.ok) {
      const accountData = await existingRes.json();
      existingWebsiteIds = (accountData.websites || []).map((w: { id: number }) => w.id);
    }

    const processedWebsiteIds: number[] = [];

    let websiteIndex = 1;
    while (data.get(`url ${websiteIndex}`) !== null) {
      const url = data.get(`url ${websiteIndex}`) as string | null;
      const label = data.get(`label ${websiteIndex}`) as string | null;
      const icon = data.get(`icon ${websiteIndex}`) as File | null;
      const websiteIdRaw = data.get(`id ${websiteIndex}`) || null;

      if (!url || !label) {
        websiteIndex++;
        continue;
      }

      const websiteObj = { url, label };
      const websiteForm = new FormData();
      websiteForm.append(
        'website',
        new Blob([JSON.stringify(websiteObj)], { type: 'application/json' })
      );
      if (icon && (icon as File).size !== 0) websiteForm.append('icon', icon as File);

      if (websiteIdRaw) {
        const websiteId = Number(websiteIdRaw);
        const putRes = await fetch(`/api/accounts/${params.id}/websites/${websiteId}`, {
          method: 'PUT',
          body: websiteForm
        });
        if (putRes.ok) {
          processedWebsiteIds.push(websiteId);
        }
      } else {
        const postRes = await fetch(`/api/accounts/${params.id}/websites`, {
          method: 'POST',
          body: websiteForm
        });
        if (postRes.ok) {
          const created = await postRes.json().catch(() => ({}));
          if (created && created.id) processedWebsiteIds.push(Number(created.id));
        }
      }

      websiteIndex++;
    }

    const toDelete = existingWebsiteIds.filter((id) => !processedWebsiteIds.includes(id));
    for (const id of toDelete) {
      await fetch(`/api/accounts/${params.id}/websites/${id}`, {
        method: 'DELETE'
      });
    }

    return { success: true };
  }
};
