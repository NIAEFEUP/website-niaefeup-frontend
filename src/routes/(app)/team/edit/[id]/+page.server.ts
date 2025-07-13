import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

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
    const birthDate = data.get('birthDate');
    const linkedin = data.get('linkedin');
    const github = data.get('github');
    const photo = data.get('photo') as File;
    const url = data.get('url') as string;
    const icon = data.get('icon') as string;
    const label = data.get('label') as string;
    const isActive = data.get('isActive') as unknown as boolean;

    const value = {
      email,
      name,
      bio,
      birthDate,
      linkedin,
      github,
      websites: [
        {
          url,
          iconPath: icon,
          label
        }
      ],
      isActive
    };

    const json = JSON.stringify(value);
    const blob = new Blob([json], { type: 'application/json' });
    const form = new FormData();
    form.append('account', blob);
    if (photo && photo.size != 0) form.append('photo', photo, photo.name);

    const success = await fetch(`/api/accounts/${params.id}`, {
      method: 'PUT',
      body: form
    }).then((res) => res.ok);

    return success;
  }
};
