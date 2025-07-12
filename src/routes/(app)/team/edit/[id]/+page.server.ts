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

    const email = data.get('Email');
    const name = data.get('Name');
    const bio = data.get('Bio');
    const birthDate = data.get('BirthDate');
    const linkedin = data.get('Linkedin');
    const github = data.get('Github');
    const photoFile = data.get('photoFile') as File;
    const url = data.get('Url') as string;
    const icon = data.get('Icon') as string;
    const label = data.get('Label') as string;
    const is_active = data.get('Is Active') as unknown as boolean;

    const value = {
      email,
      name,
      bio,
      birthDate,
      linkedin,
      github,
      photoFile,
      websites: [
        {
          url,
          iconPath: icon,
          label
        }
      ],
      is_active
    };

    const json = JSON.stringify(value);
    const blob = new Blob([json], { type: 'application/json' });
    const form = new FormData();
    form.append('account', blob);
    if (photoFile && photoFile.size != 0) form.append('photoFile', photoFile, photoFile.name);

    const success = await fetch(`/api/accounts/${params.id}`, {
      method: 'PUT',
      body: form
    }).then((res) => res.ok);

    return success;
  }
};
